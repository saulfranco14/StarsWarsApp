import { create } from "zustand";
import { CharacterState } from "@/interfaces";

export const useCharacterStore = create<CharacterState>((set) => ({
  characters: [],
  loading: false,
  error: null,
  setCharacters: (characters) => set({ characters }),
}));
