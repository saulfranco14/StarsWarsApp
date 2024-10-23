import { CharacterCreateState } from "@/interfaces";
import { create } from "zustand";

export const useCharacterStore = create<CharacterCreateState>((set) => ({
  values: {
    name: "",
    species: "",
    gender: "",
    homeworld: "",
    image: "",
  },
  setValues: (newValues) =>
    set((state) => ({
      values: { ...state.values, ...newValues },
    })),
}));
