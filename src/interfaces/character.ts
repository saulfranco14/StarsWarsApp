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

export type IUpdateCharacter = Omit<BaseCharacter, "id" | "gender">;
