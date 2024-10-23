import { create } from "zustand";
import { CharacterState } from "@/interfaces";
import { getCharacters } from "@/services/character";

export const useCharacterStore = create<CharacterState>((set) => ({
  characters: [],
  loading: false,
  error: null,
  setCharacters: (characters) => set({ characters }),
}));
