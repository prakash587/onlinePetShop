import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThePulseLoader from "../../components/pulse-loader";
import { addPetAccessory } from "../../action-creators/inventory-action";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddAccessories = () => {
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
    productName: "",
    brand: "",
    category: "Toys",
    description: "",
    materials: "",
    size: "",
    price: "",
    images: images,
  };

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product name is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    materials: Yup.string().required("Materials are required"),
    size: Yup.number().required("Sizes are required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be greater than or equal to 0"),
    images: Yup.array().min(1, "At least one image is required").nullable(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await addPetAccessory(values, token)
      .then(() => {
        toast.success("Pet-accessory added successfully.");
        resetForm({ ...values, images: [] });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="flex flex-col items-start w-full">
      <h2 className="text-2xl font-bold mb-4">Add Accessories</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="w-full md:w-2/3 lg:w-1/2">
            <div className="mb-5 flex flex-col items-start w-full">
              <label
                htmlFor="productName"
                className="mb-2 font-semibold tracking-wider text-lg"
              >
                Product Name
              </label>
              <Field
                type="text"
                name="productName"
                placeholder="Enter product name"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="productName"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full">
              <label
                htmlFor="brand"
                className="mb-2 font-semibold tracking-wider text-lg"
              >
                Brand
              </label>
              <Field
                type="text"
                name="brand"
                placeholder="Enter brand"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="brand"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full">
              <label
                htmlFor="category"
                className="mb-2 font-semibold tracking-wider text-lg"
              >
                Category
              </label>
              <Field
                as="select"
                name="category"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              >
                <option value="Toys">Toys</option>
                <option value="Clothes">Clothes</option>
                <option value="Leashes">Leashes</option>
                <option value="Shelters">Shelters</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full">
              <label
                htmlFor="description"
                className="mb-2 font-semibold tracking-wider text-lg"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows={4}
                placeholder="Enter description"
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
                htmlFor="materials"
                className="mb-2 font-semibold tracking-wider text-lg"
              >
                Materials
              </label>
              <Field
                type="text"
                name="materials"
                placeholder="Enter materials"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="materials"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="flex flex-row items-start justify-between gap-x-5">
              <div className="mb-5 flex flex-col items-start w-full">
                <label
                  htmlFor="size"
                  className="mb-2 font-semibold tracking-wider text-lg"
                >
                  Size
                </label>
                <Field
                  type="number"
                  name="size"
                  placeholder="Enter available sizes"
                  className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
                />
                <ErrorMessage
                  name="size"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-5 flex flex-col items-start w-full">
                <label
                  htmlFor="price"
                  className="mb-2 font-semibold tracking-wider text-lg"
                >
                  Price
                </label>
                <Field
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500"
                />
              </div>
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
                multiple // Allow multiple file selection
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
                className="bg-red-600 text-white rounded mt-8 h-10 w-44"
              >
                {isSubmitting ? (
                  <ThePulseLoader></ThePulseLoader>
                ) : (
                  "Add Accessory"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAccessories;
