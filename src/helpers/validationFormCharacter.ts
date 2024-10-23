import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  species: Yup.string().required("Species is required"),
  gender: Yup.string().required("Gender is required"),
  homeworld: Yup.string().required("Homeworld is required"),
  image: Yup.string().url("Invalid URL").required("Image URL is required"),
});

export const updateValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  species: Yup.string().required("Species is required"),
  homeworld: Yup.string().required("Homeworld is required"),
  image: Yup.string().url("Invalid URL").required("Image URL is required"),
});