"use client";

import { getCharacterById, updateCharacter } from "@/services/character";
import { validateId } from "@/utils/validateId";
import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";

export default function CharacterEditPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    homeworld: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [characterId, setCharacterId] = useState<number | null>(null);

  useEffect(() => {
    const fetchParamsAndData = async () => {
      const { id } = await params;
      const idCharacter = validateId(id);
      if (idCharacter === null) return notFound();

      const character = await getCharacterById(idCharacter);
      if (!character) return notFound();

      setFormData({
        name: character.name,
        species: character.species,
        homeworld: character.homeworld,
        image: character.image,
      });
      setCharacterId(idCharacter);
      setLoading(false);
    };

    fetchParamsAndData();
  }, [params]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (characterId) {
        await updateCharacter(characterId, formData);
        alert("Character updated successfully!");
        router.push(`/`);
      }
    } catch (error) {
      console.error("Failed to update character:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-96 h-96 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-4 w-full lg:w-auto"
        >
          <Image
            src={formData.image}
            alt={formData.name}
            width={200}
            height={200}
            className="w-full h-auto object-cover rounded-lg mb-4"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Species
            </label>
            <input
              type="text"
              name="species"
              value={formData.species}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Homeworld
            </label>
            <input
              type="text"
              name="homeworld"
              value={formData.homeworld}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
