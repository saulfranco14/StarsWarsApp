"use client";

import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { createCharacter } from "@/services/character";
import { useCharacterStore } from "@/store/useCharacterCreateStore";
import { validationSchema } from "@/helpers/validationFormCharacter";
import { formFields } from "@/config/formCreateCharacter";
import { ICreateCharacter } from "@/interfaces";
import { notifyError, notifySuccess } from "@/utils";
import { useEffect } from "react";

export default function CreateCharacter() {
  const router = useRouter();
  const { values } = useCharacterStore();

  const handleSubmit = async (values: ICreateCharacter) => {
    await createCharacter(values);
    router.push("/");
    notifySuccess("Character created successfully!");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Create New Character</h1>
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 w-full lg:w-1/4 p-4 bg-white shadow-none lg:shadow-lg rounded-none lg:rounded-lg">
            {formFields.map((field) => (
              <div key={field.name} className="my-4">
                <label htmlFor={field.name}>{field.label}</label>
                <Field
                  name={field.name}
                  className="border w-full p-2 mb-1 rounded-md"
                  placeholder={field.placeholder}
                />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>
            ))}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                Create
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
  );
}
