"use client";

import { Character } from "@/interfaces";
import CharacterCard from "./CharacterCard";
import { CharacterDataProps } from "@/interfaces/characterDataProp";
import { useRouter } from "next/navigation"; 
import ButtonsCards from "../button/ButtonsCards";
import { deleteCharacter, getCharacters } from "@/services/character";
import { useState, useEffect } from "react";

export default function CharacterData({ characters: initialCharacters }: CharacterDataProps) {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>(initialCharacters); 

  const reloadCharacters = async () => {
    try {
      const updatedCharacters = await getCharacters();
      setCharacters(updatedCharacters); 
    } catch (error) {
      console.error("Failed to load characters:", error);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/character/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (confirm(`Are you sure you want to delete character with ID ${id}?`)) {
      try {
        await deleteCharacter(id);
        alert(`Character with ID ${id} has been deleted.`);
        await reloadCharacters(); 
      } catch (error) {
        console.error("Failed to delete character:", error);
        alert(`Failed to delete character with ID ${id}.`);
      }
    }
  };

  useEffect(() => {
    reloadCharacters();
  }, []);

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
