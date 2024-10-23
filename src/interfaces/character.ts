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

export interface ICreateCharacter extends Omit<Character, "id"> {}

export interface IUpdateCharacter extends Omit<Character, "id" | "gender"> {}
