"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { updateCharacter } from "@/services/character";
import { useUpdateCharacterStore } from "@/store/useCharacterUpdateStore";
import { updateValidationSchema } from "@/helpers/validationFormCharacter";
import { useFetchCharacter } from "@/hooks/useFetchCharacter";
import { updateFormFields } from "@/config/formUpdateCharacter";

export default function CharacterEditPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const router = useRouter();
  const { initialValues, characterId } = useUpdateCharacterStore();

  useFetchCharacter(params);

  const handleSubmit = async (values: typeof initialValues) => {
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

  if (!characterId) {
    return (
      <div className="w-screen h-screen text-2xl font-bold flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-auto w-screen flex justify-start lg:justify-center items-start lg:items-center">
      <div className="w-full h-auto lg:h-screen flex flex-col justify-start lg:justify-center items-start lg:items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={updateValidationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-none lg:shadow-lg rounded-none lg:rounded-lg p-4 w-full lg:w-[30%]">
              <Image
                src={initialValues.image}
                alt={initialValues.name}
                width={200}
                height={200}
                className="w-full max-h-[40vh] object-contain mb-4"
              />

              {updateFormFields.map((field) => (
                <div key={field.name} className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <Field
                    name={field.name}
                    className="border w-full p-2 rounded-md"
                    placeholder={field.placeholder}
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}

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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
