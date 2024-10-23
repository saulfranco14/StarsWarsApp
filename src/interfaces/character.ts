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

export type ICreateCharacter = BaseCharacter;

export interface IUpdateCharacter extends Omit<Character, "id" | "gender"> {}
