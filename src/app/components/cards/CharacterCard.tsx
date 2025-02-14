import { CharacterCardProps } from "@/interfaces";
import Image from "next/image";

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <>
      <Image
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
        className="w-full h-auto object-cover rounded-lg mb-4"
      />
      <h2 className="font-semibold text-xl mb-2">{character.name}</h2>
      <p className="text-gray-600">Species: {character.species}</p>
      <p className="text-gray-600">Species: {character.gender}</p>
      <p className="text-gray-600">Homeworld: {character.homeworld}</p>
    </>
  );
}
