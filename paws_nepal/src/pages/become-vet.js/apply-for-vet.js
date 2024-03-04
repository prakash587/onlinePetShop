import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThePulseLoader from "../../components/pulse-loader";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { registerDoctorRequest } from "../../action-creators/auth-action";
import { useNavigate } from "react-router-dom";

const BecomeADoctor = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;

  const scrollRef = useRef(0);

  const navigate = useNavigate();

  const [instituteName, setInstitution] = useState("");
  const [grade, setGrade] = useState("");
  const [showFields, setShowFields] = useState(false);

  const [educationList, setEducationList] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleAddEducation = () => {
    if (instituteName.trim() && grade.trim()) {
      const newEducation = { instituteName: instituteName, grade: grade };
      setEducationList([...educationList, newEducation]);
      setInstitution("");
      setGrade("");
    }
  };

  const handleDeleteEducation = (id) => {
    const updatedEducationList = educationList.filter(
      (edu, index) => index !== id
    );
    setEducationList(updatedEducationList);
  };

  const initialValues = {
    specialization: "",
    experience: "",
  };

  const validationSchema = Yup.object().shape({
    specialization: Yup.string().required("Specialization is required"),
    experience: Yup.number().required("Experience is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (educationList.length === 0) {
      toast.error("Please provide your educational background.");
    }
    await registerDoctorRequest(
      { ...values, education: educationList, imageFiles: imageFiles },
      token
    )
      .then(() => {
        toast.success("Your application has been sent");
        navigate("/category/All");
        resetForm();
        setImageFiles([]);
        setEducationList([]);
        setInstitution("");
        setGrade("");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-3 md:px-28">
      <h2 className="text-2xl font-bold mb-4">Become a Doctor</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="w-full md:w-2/3 lg:w-1/2">
            <div className="mb-5 flex flex-col items-start w-full">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="specialization"
              >
                Specialization
              </label>
              <Field
                placeholder="Enter specialization"
                type="text"
                name="specialization"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="specialization"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="experience"
              >
                Experience (in years)
              </label>
              <Field
                placeholder="Enter experience"
                type="number"
                name="experience"
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="experience"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5 flex flex-col items-start w-full">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="documents"
              >
                Documents
              </label>

              <input
                className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
                type="file"
                multiple
                accept="image/*"
                onChange={(event) => {
                  console.log("changed");
                  const files = event.target.files;
                  const theFiles = Array.from(files);
                  const fileList = [];
                  theFiles.forEach((file) => {
                    const newFile = new File([file], file.name);
                    fileList.push(newFile);
                  });
                  setImageFiles(fileList);
                }}
              />
            </div>
            <div className="flex flex-row justify-end">
              <button
                className="bg-red-600 mt-5 text-white py-2 px-10 rounded-md"
                onClick={() => setShowFields(!showFields)}
                type="button"
              >
                Add Education
              </button>
            </div>

            {showFields && (
              <div className="mt-2 flex flex-col items-end">
                <input
                  type="text"
                  placeholder="Institution"
                  value={instituteName}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="bg-zinc-800 px-3 py-3 rounded-lg w-full mb-5"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="bg-zinc-800 px-3 py-3 rounded-lg w-full"
                />
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="bg-transparent px-8 border border-solid border-red-600 text-red-600 hover:text-white hover:bg-red-700 p-2 rounded-md mt-2"
                >
                  Add
                </button>
              </div>
            )}
            {educationList.length !== 0 && (
              <div className="mt-4 flex flex-col items-start w-full">
                <h3 className="font-semibold tracking-wider">
                  Education Details:
                </h3>
                <ul className="w-full mt-3">
                  {educationList.map((education, index) => (
                    <li
                      key={education.id}
                      className="flex w-full justify-between items-center border border-solid border-white rounded-sm py-2.5 px-5 mb-2"
                    >
                      <div className="flex flex-row">
                        <p className="pr-1"> {education.instituteName} - </p>
                        <p className="font-bold"> {education.grade}</p>
                      </div>

                      <FontAwesomeIcon
                        onClick={() => {
                          handleDeleteEducation(index);
                        }}
                        icon={faTrash}
                        className="cursor-pointer text-red-600"
                      ></FontAwesomeIcon>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className="bg-red-600 text-white rounded mt-8 h-10 w-44 "
              >
                {isSubmitting ? <ThePulseLoader /> : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BecomeADoctor;
