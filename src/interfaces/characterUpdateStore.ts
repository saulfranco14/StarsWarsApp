export interface CharacterUpdateState {
  initialValues: {
    name: string;
    species: string;
    homeworld: string;
    image: string;
  };
  setInitialValues: (
    newValues: Partial<CharacterUpdateState["initialValues"]>
  ) => void;
  characterId: number | null;
  setCharacterId: (id: number | null) => void;
}
