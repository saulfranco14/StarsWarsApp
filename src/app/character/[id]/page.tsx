"use client";

import { getCharacterById, updateCharacter } from "@/services/character";
import { validateId } from "@/utils/validateId";
import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CharacterEditPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [characterId, setCharacterId] = useState<number | null>(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    species: "",
    homeworld: "",
    image: "",
  });

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
      setLoading(false);
    };

    fetchParamsAndData();
  }, [params]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    species: Yup.string().required("Species is required"),
    homeworld: Yup.string().required("Homeworld is required"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      if (characterId) {
        await updateCharacter(characterId, values);
        alert("Character updated successfully!");
        router.push(`/`);
      }
    } catch (error) {
      console.error("Failed to update character:", error);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  if (loading) {
    return <div className="w-screen h-screen text-2xl font-bold flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="h-auto w-screen flex justify-start lg:justify-center items-start lg:items-center">
      <div className="w-full h-auto lg:h-screen flex flex-col  justify-start lg:justify-center items-start lg:items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-none lg:shadow-lg rounded-none  lg:rounded-lg p-4 w-full lg:w-[30%]">
              <Image
                src={initialValues.image}
                alt={initialValues.name}
                width={200}
                height={200}
                className="w-full max-h-[40vh] object-contain mb-4"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="border w-full p-2 rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <label className="block text-sm font-medium text-gray-700 my-3">
                  Species
                </label>
                <Field
                  type="text"
                  name="species"
                  className="border w-full p-2 rounded-md"
                />
                <ErrorMessage
                  name="species"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <label className="block text-sm font-medium text-gray-700 my-3">
                  Homeworld
                </label>
                <Field
                  type="text"
                  name="homeworld"
                  className="border w-full p-2 rounded-md"
                />
                <ErrorMessage
                  name="homeworld"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <label className="block text-sm font-medium text-gray-700 my-3">
                  Image URL
                </label>
                <Field
                  type="text"
                  name="image"
                  className="border w-full p-2 rounded-md"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <div className="flex flex-col">
                  <button
                    type="submit"
                    className="my-3 w-full bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
