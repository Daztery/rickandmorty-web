export interface CharacterDTO {
  id: number;
  name: string;
  status: string;
  image: string;
  species: string;
  gender: string;
}

export interface CharactersResponseDTO {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CharacterDTO[];
}
