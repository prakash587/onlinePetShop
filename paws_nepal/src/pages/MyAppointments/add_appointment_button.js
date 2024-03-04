import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom/dist";

const AddAppointmentButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/add-schedule");
      }}
      className="bg-green-500 hover:bg-green-700 text-white sm:py-2.5 font-bold lg:py-2 px-4 rounded-sm "
    >
      <FontAwesomeIcon icon={faPlus} /> Add Schedule
    </button>
  );
};

export default AddAppointmentButton;
