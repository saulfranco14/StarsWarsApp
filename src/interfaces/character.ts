export interface BaseCharacter {
  name: string;
  gender: string;
  species: string;
  homeworld: string;
  image: string;
}

export interface Character extends BaseCharacter {
  id: number;
}

export interface CreateCharacter extends Omit<Character, "id"> {}

export interface UpdateCharacter extends Omit<Character, "id" | "gender"> {}
