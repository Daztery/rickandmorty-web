import { createCharacterRepository } from "@/lib/repositories/character.repo";
import { ListCharacters } from "./ListCharacters";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam ?? "1");

  const repo = createCharacterRepository("/api");
  const data = await repo.getPage(page);

  return <ListCharacters data={data} />;
}
