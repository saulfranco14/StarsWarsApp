import { ICreateCharacter, IUpdateCharacter } from "@/interfaces";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_URL)
  throw new Error(
    " URL is not defined. Please set URL in your environment variables."
  );

export const getCharacters = async () => {
  try {
    const response = await fetch(`${API_URL}/characters`);

    if (!response.ok) console.error("Failed to fetch characters");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/characters/${id}`);

    if (!response.ok) {
      console.error(`Failed to fetch character with id: ${id}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching character by ID:", error);
    throw error;
  }
};

export const updateCharacter = async (
  id: number,
  characterData: IUpdateCharacter
) => {
  const response = await fetch(`${API_URL}/characters/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterData),
  });

  if (!response.ok) console.error("Failed to update character");

  return await response.json();
};

export const deleteCharacter = async (id: number) => {
  const response = await fetch(`${API_URL}/characters/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) console.error("Failed to delete character");

  return await response.json();
};

export const createCharacter = async (characterData: ICreateCharacter) => {
  const response = await fetch(`${API_URL}/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterData),
  });

  if (!response.ok) console.error("Failed to create character");

  return await response.json();
};
