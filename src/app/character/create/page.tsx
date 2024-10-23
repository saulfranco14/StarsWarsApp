"use client";

import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createCharacter } from "@/services/character";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  species: Yup.string().required("Species is required"),
  gender: Yup.string().required("Gender is required"),
  homeworld: Yup.string().required("Homeworld is required"),
  image: Yup.string().url("Invalid URL").required("Image URL is required"),
});

export default function CreateCharacter() {
  const router = useRouter();

  const initialValues = {
    name: "",
    species: "",
    gender: "",
    homeworld: "",
    image: "",
  };

  const handleSubmit = async (values: any) => {
    await createCharacter(values);
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Create New Character</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-4 w-full lg:w-1/4 p-4 bg-white  shadow-none lg:shadow-lg rounded-none lg:rounded-lg">
              <div className="my-4">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  className="border w-full p-2 mb-1 rounded-md"
                  placeholder="Enter character name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>
              <div className="my-4">
                <label htmlFor="species">Species</label>
                <Field
                  name="species"
                  className="border w-full p-2 mb-1 rounded-md"
                  placeholder="Enter species"
                />
                <ErrorMessage
                  name="species"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>
              <div className="my-4">
                <label htmlFor="gender">Gender</label>
                <Field
                  name="gender"
                  className="border w-full p-2 mb-1 rounded-md"
                  placeholder="Enter gender"
                />
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>
              <div className="my-4">
                <label htmlFor="homeworld">Homeworld</label>
                <Field
                  name="homeworld"
                  className="border w-full p-2 mb-1 rounded-md"
                  placeholder="Enter homeworld"
                />
                <ErrorMessage
                  name="homeworld"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>
              <div className="my-4">
                <label htmlFor="image">Image URL</label>
                <Field
                  name="image"
                  className="border w-full p-2 mb-1 rounded-md"
                  placeholder="Enter image URL"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mb-4"
                />
              </div>
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
    </>
  );
}
