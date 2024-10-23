import { CharacterUpdateState } from '@/interfaces';
import { create } from 'zustand';

export const useUpdateCharacterStore = create<CharacterUpdateState>((set) => ({
  initialValues: {
    name: '',
    species: '',
    homeworld: '',
    image: '',
  },
  setInitialValues: (newValues) => set((state) => ({
    initialValues: { ...state.initialValues, ...newValues }
  })),
  characterId: null,
  setCharacterId: (id) => set(() => ({ characterId: id })),
}));
