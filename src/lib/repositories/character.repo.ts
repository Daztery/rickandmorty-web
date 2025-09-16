import { CharacterDTO } from "@/types/dto/character.dto";
import { Paginated } from "@/types/response";
import { httpGet } from "../https";

export interface CharacterRepository {
  getPage(page: number): Promise<Paginated<CharacterDTO>>;
}

export function createCharacterRepository(base = "/api"): CharacterRepository {
  return {
    async getPage(page: number) {
      const rest = await httpGet<Paginated<CharacterDTO>>(
        `${base}/characters?page=${page}`,
        { revalidate: 60 }
      );
      if (!rest.success || !rest.data) {
        throw new Error(rest.error || "Failed to fetch characters");
      }
      return rest.data;
    },
  };
}
