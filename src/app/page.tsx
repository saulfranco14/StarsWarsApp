import { getCharacters } from "@/services/character";
import CharacterData from "./components/cards/CharacterData";

export default async function Home() {
  const charactersData = await getCharacters();

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 p-4 lg:p-8">
      <h1 className="font-bold text-7xl mb-8">Star Wars</h1>
      <CharacterData characters={charactersData} />
    </div>
  );
}
