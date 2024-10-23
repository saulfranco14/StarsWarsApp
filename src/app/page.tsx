import { getCharacters } from "@/services/character";
import CharacterData from "./components/cards/CharacterData";
import Link from "next/link";

export default async function Home() {
  const charactersData = await getCharacters();

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 p-4 lg:p-8">
      <h1 className="font-bold text-7xl">Star Wars</h1>
      <Link
        href="/character/create"
        className="bg-green-500 text-white px-4 py-2 rounded my-4"
      >
        Create New Character
      </Link>
      <CharacterData characters={charactersData} />
    </div>
  );
}
