import { useEffect } from "react";
import { notFound } from "next/navigation";
import { getCharacterById } from "@/services/character";
import { useUpdateCharacterStore } from "@/store/useCharacterUpdateStore";

export const useFetchCharacter = (params: Promise<{ id: number }>) => {
  const { setInitialValues, setCharacterId } = useUpdateCharacterStore();

  useEffect(() => {
    const fetchParamsAndData = async () => {
      const { id } = await params;

      if (id === null) return notFound();

      const character = await getCharacterById(id);
      if (!character) return notFound();

      setInitialValues({
        name: character.name,
        species: character.species,
        homeworld: character.homeworld,
        image: character.image,
      });
      setCharacterId(id);
    };

    fetchParamsAndData();
  }, [params, setInitialValues, setCharacterId]);
};
