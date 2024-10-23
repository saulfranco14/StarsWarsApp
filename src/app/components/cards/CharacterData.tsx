import { Character } from "@/interfaces";
import CharacterCard from "./CharacterCard";
import { CharacterDataProps } from "@/interfaces/characterDataProp";

export default function CharacterData({ characters }: CharacterDataProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full">
      {characters.map((character: Character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
