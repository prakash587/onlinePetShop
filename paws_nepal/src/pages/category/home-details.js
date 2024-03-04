import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Accessories from "./accessories";
import PetFoods from "./pet-foods";
import Breeds from "./breeds";
import { useParams } from "react-router-dom";

const HomePageDetails = () => {
  const { category } = useParams();
  return (
    <div className="flex flex-col items-start w-full">
      <Breeds category={category}></Breeds>
      <PetFoods category={category}></PetFoods>
      <Accessories category={category}></Accessories>
    </div>
  );
};

export default HomePageDetails;
