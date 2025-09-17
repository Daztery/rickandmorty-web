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
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Rick & Morty Characters
        </h1>
        <p className="text-sm text-slate-600">
          Next.js + Bun + Tailwind + Pagination
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ul className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.items.map((c) => (
            <CharacterCard key={c.id} character={c} />
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <Pagination page={data.page} totalPages={data.totalPages} />
      </div>
    </main>
  );
}
