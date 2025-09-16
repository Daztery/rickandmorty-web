import { createCharacterRepository } from "@/lib/repositories/character.repo";
import { CharacterCard } from "@/components/CharacterCard";
import { Pagination } from "@/components/Pagination";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam ?? "1");

  const repo = createCharacterRepository("/api");
  const data = await repo.getPage(page);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Rick & Morty Characters</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </ul>

      <div className="mt-6">
        <Pagination page={data.page} totalPages={data.totalPages} />
      </div>
    </main>
  );
}
