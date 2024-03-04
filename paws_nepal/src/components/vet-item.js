import React from "react";
import { useNavigate } from "react-router-dom";

const VetItem = ({ vet }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-start gap-y-3 md:flex-row md:justify-between md:items-center mb-6 hover:translate-x-2 transition-all duration-500 ease-in-out cursor-pointer">
      <div className="flex flex-row items-center gap-x-4">
        <img
          className="h-14 w-14 rounded-full"
          src={`http://localhost:3009/uploads/${vet.image}`}
          alt="vet"
        />
        <div className="flex flex-col items-start">
          <p className="font-semibold"> Dr. {vet.name} </p>
          <p className="text-zinc-500 font-semibold "> {vet.specialization} </p>
        </div>
      </div>
      <div
        onClick={() => {
          navigate(`/doctor-details/${vet.doctorId}/appointmentdates`);
        }}
        className="bg-zinc-800 text-center rounded-md px-5 py-2 hover:bg-red-600 transition-all duration-700 cursor-pointer"
      >
        View Profile
      </div>
    </div>
  );
};

export default VetItem;
