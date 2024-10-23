export interface CharacterCreateState {
  values: {
    name: string;
    species: string;
    gender: string;
    homeworld: string;
    image: string;
  };
  setValues: (newValues: Partial<CharacterCreateState["values"]>) => void;
}
