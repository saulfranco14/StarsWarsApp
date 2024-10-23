"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Character } from "@/interfaces";
import { ConfirmDialog } from "../modal";
import { CharacterDataProps } from "@/interfaces/characterDataProp";
import { deleteCharacter, getCharacters } from "@/services/character";
import { notifyError, notifySuccess } from "@/utils";
import CharacterCard from "./CharacterCard";
import ButtonsCards from "../button/ButtonsCards";


export default function CharacterData({
  characters: initialCharacters,
}: CharacterDataProps) {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [isConfirmVisible, setConfirmVisible] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

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

  const handleDeleteClick = (id: number) => {
    setSelectedCharacterId(id);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCharacterId !== null) {
      try {
        await deleteCharacter(selectedCharacterId);
        notifySuccess(`Character with ID ${selectedCharacterId} has been deleted.`);
        await reloadCharacters();
      } catch (error) {
        console.error("Failed to delete character:", error);
        notifyError(`Failed to delete character with ID ${selectedCharacterId}.`);
      } finally {
        setConfirmVisible(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmVisible(false);
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
            onDelete={() => handleDeleteClick(character.id)}
          />
        </div>
      ))}

      {isConfirmVisible && (
        <ConfirmDialog
          message={`Are you sure you want to delete character with ID ${selectedCharacterId}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
