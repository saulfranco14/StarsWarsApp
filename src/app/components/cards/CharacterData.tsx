"use client";

import { Character } from "@/interfaces";
import CharacterCard from "./CharacterCard";
import { CharacterDataProps } from "@/interfaces/characterDataProp";
import { useRouter } from "next/navigation"; // Cambia a next/navigation
import ButtonsCards from "../button/ButtonsCards";

export default function CharacterData({ characters }: CharacterDataProps) {
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/character/${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm(`Are you sure you want to delete ${id}?`)) {
      alert(`${id} has been deleted.`);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full">
      {characters.map((character: Character) => (
        <div
          key={character.id}
          className="bg-white shadow-lg rounded-lg p-4 w-full lg:w-auto"
        >
          <CharacterCard character={character} />
          <ButtonsCards
            onEdit={() => handleEdit(character.id)}
            onDelete={() => handleDelete(character.id)}
          />
        </div>
      ))}
    </div>
  );
}
