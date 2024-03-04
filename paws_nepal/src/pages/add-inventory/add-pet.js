import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThePulseLoader from "../../components/pulse-loader";
import { useSelector } from "react-redux";
import { addPet } from "../../action-creators/inventory-action";
import toast from "react-hot-toast";

const AddPet = () => {
  const [images, setImages] = useState([]);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;

  const handleImageChange = (event, setFieldValue) => {
    const fileList = Array.from(event.currentTarget.files);
    const selectedImages = fileList.map((file) => URL.createObjectURL(file));
    setImages(selectedImages);
    setFieldValue("images", fileList);
  };

  const initialValues = {
    petName: "",
    category: "Dogs",
    breed: "",
    age: "",
    price: "",
    description: "",
    images: images,
  };

  const validationSchema = Yup.object().shape({
    petName: Yup.string().required("Pet name is required"),
    category: Yup.string().required("Category is required"),
    breed: Yup.string().required("Breed is required"),
    age: Yup.number().required("Age is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Medical Info is required"),
    images: Yup.array().min(1, "At least one image is required").nullable(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await addPet(values, token)
      .then(() => {
        toast.success("Pet added successfully.");
        // resetForm({ ...values, images: [] });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="flex flex-col items-start w-full">
      <h2 className="text-2xl font-bold mb-4">Add Pet</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className=" w-full md:w-2/3 lg:w-1/2">
            <div className="mb-5 flex flex-col items-start w-full ">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="petName"
              >
                Pet Name
              </label>
              <Field
                placeholder="Enter name"
                type="text"
                name="petName"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="petName"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full ">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="category"
              >
                Category
              </label>
              <Field
                as="select"
                name="category"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              >
                <option value="Dogs">Dogs</option>
                <option value="Cats">Cats</option>
                <option value="Birds">Birds</option>
                <option value="Fishes">Fishes</option>
                <option value="Others">Others</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full ">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="breed"
              >
                Breed
              </label>
              <Field
                placeholder="Enter breed"
                type="text"
                name="breed"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="breed"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full ">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="age"
              >
                Age
              </label>
              <Field
                placeholder="Enter age"
                type="number"
                name="age"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full ">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="price"
              >
                Price
              </label>
              <Field
                placeholder="Enter price"
                type="number"
                name="price"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full ">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="description"
              >
                Description
              </label>
              <Field
                as="textarea"
                rows={6}
                placeholder="Enter short description"
                type="text"
                name="description"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="images"
              >
                Images
              </label>
              <input
                id="images"
                name="images"
                type="file"
                onChange={(event) => handleImageChange(event, setFieldValue)}
                // multiple // Allow multiple file selection
                accept="image/*" // Allow only image files
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full text-zinc-500"
              />

              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Display selected images */}
            <div className="mt-4 flex flex-row flex-wrap gap-x-4 gap-y-4">
              {images.map((imageUrl, index) => (
                <a
                  key={index}
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`tag ${index + 1}`}
                    className="w-32 h-32 rounded object-cover border border-solid border-white"
                  />
                </a>
              ))}
            </div>
            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className="bg-red-600 text-white rounded mt-8 h-10 w-44 "
              >
                {isSubmitting ? <ThePulseLoader></ThePulseLoader> : "Add Pet"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPet;
