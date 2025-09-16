import type { CharacterDTO } from "@/types/dto/character.dto";

export interface CharacterCardProps {
  character: CharacterDTO;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <li className="rounded-lg border p-4 flex gap-4 items-center">
      <img
        src={character.image}
        alt={character.name}
        className="h-20 w-20 rounded-md object-cover"
      />
      <div>
        <h3 className="font-medium">{character.name}</h3>
        <p className="text-sm text-neutral-600">
          {character.species} • {character.gender}
        </p>
        <span className="inline-block mt-1 text-xs rounded bg-neutral-100 px-2 py-0.5">
          {character.status}
        </span>
      </div>
    </li>
  );
}
