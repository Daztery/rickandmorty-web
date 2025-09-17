import type { CharacterDTO } from "@/types/dto/character.dto";
import Image from "next/image";

export interface CharacterCardProps {
  character: CharacterDTO;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <li className="group rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-transparent hover:shadow-md hover:ring-slate-200 transition">
      {/* Media */}
      <div className="relative aspect-[16/11] overflow-hidden rounded-t-2xl">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug text-slate-900">
            {character.name}
          </h3>
        </div>

        <p className="mt-1 text-sm text-slate-600">
          {character.species} • {character.gender}
        </p>
      </div>
    </li>
  );
}
