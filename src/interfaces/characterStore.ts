import { Character } from "./character";

export interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  setCharacters: (characters: Character[]) => void;
}
