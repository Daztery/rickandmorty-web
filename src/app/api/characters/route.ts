import { CharacterDTO, CharactersResponseDTO } from "@/types/dto/character.dto";
import { ApiResponse, Paginated } from "@/types/response";
import { NextResponse } from "next/server";

const BASE = "https://rickandmortyapi.com/api/character";
export const revalidate = 60;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? "1");

    const upstream = await fetch(`${BASE}?page=${page}`, {
      next: { revalidate },
    });
    if (!upstream.ok) {
      const body: ApiResponse<Paginated<CharacterDTO>> = {
        success: false,
        message: `Upstream ${upstream.status}`,
      };
      return NextResponse.json(body, { status: upstream.status });
    }

    const dto = (await upstream.json()) as CharactersResponseDTO;

    const data: Paginated<CharacterDTO> = {
      items: dto.results,
      page,
      totalPages: dto.info.pages,
      totalItems: dto.info.count,
      hasNext: Boolean(dto.info.next),
      hasPrev: Boolean(dto.info.prev),
    };

    const body: ApiResponse<Paginated<CharacterDTO>> = { success: true, data };
    return NextResponse.json(body, {
      headers: {
        "Cache-Control": `s-maxage=${revalidate}, stale-while-revalidate=120`,
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    const body: ApiResponse<Paginated<CharacterDTO>> = {
      success: false,
      message: message,
    };
    return NextResponse.json(body, { status: 500 });
  }
}
