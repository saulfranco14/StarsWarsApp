export const getCharacters = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const response = await fetch(`${apiUrl}/characters`);

    if (!response.ok) console.error("Failed to fetch characters");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};
