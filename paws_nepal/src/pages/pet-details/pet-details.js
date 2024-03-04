import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const PetDetailsPage = () => {
  const scrollRef = useRef(0);

  const location = useLocation();

  const pet = location.state.pet;
  console.log(pet);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="flex flex-col items-start justify-start px-10 md:px-36">
      <div className="flex flex-col items-start">
        <p className="text-lg tracking-wider font-semibold text-zinc-400 mb-5">
          {" "}
          Home / <span className="text-white"> Pets </span>
        </p>
        <p className="text-2xl font-bold mb-5"> {pet.name} </p>
        <img
          className="w-full md:w-2/3 lg:w-1/2 h-96 object-cover rounded-lg "
          src={`http://localhost:3009/uploads/${pet.image}`}
          alt="paws-nepal"
        ></img>
        <p className="font-semibold tracking-wider mt-8"> About </p>
        <div style={{ height: "0.5px" }} className="w-full bg-white my-4"></div>
        <div className="flex flex-row justify-between w-full tracking-wider">
          <div className="flex flex-col items-start w-1/2 gap-y-1">
            <p className="text-zinc-500"> Name</p>
            <p>{pet.name}</p>
          </div>
          <div className="flex flex-col items-start w-1/2 gap-y-1">
            <p className="text-zinc-500"> Breed</p>
            <p className="text-start">{pet.breed}</p>
          </div>
        </div>
        <div style={{ height: "0.5px" }} className="w-full bg-white my-4"></div>
        <div className="flex flex-row justify-between w-full tracking-wider">
          <div className="flex flex-col items-start w-1/2 gap-y-1">
            <p className="text-zinc-500"> Age</p>
            <p className="text-start">{pet.age}</p>
          </div>
        </div>

        <p className="font-semibold tracking-wider mt-11"> Description</p>
        <div style={{ height: "0.5px" }} className="w-full bg-white my-4"></div>
        <p className="text-zinc-500"> {pet.description} </p>
      </div>
    </div>
  );
};

export default PetDetailsPage;
