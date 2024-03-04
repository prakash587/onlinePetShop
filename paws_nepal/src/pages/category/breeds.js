import React, { useEffect, useState } from "react";
import PetItem from "../../components/pet-item";
import PetItemShimmer from "../../utilities/shimmers/pet-item-shimmer";
import LoadError from "./load-error";
import {
  fetchPets,
  fetchPetsByCategory,
} from "../../action-creators/inventory-action";
import { useDispatch, useSelector } from "react-redux";
import { inventorySliceActions } from "../../slices/inventory-slice";

const Breeds = ({ category }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const inventoryState = useSelector((state) => {
    return state.inventory;
  });

  const pets = inventoryState.pets;

  useEffect(() => {
    const fetchThePets = async () => {
      console.log(`the category is: ${category}`);
      setIsLoading(true);
      setError(null);

      if (category === "All") {
        await fetchPets()
          .then((data) => {
            if (data.result.length === 0) {
              dispatch(
                inventorySliceActions.replacePetsList({
                  list: [],
                })
              );
              setError("No pets available.");
            } else {
              dispatch(
                inventorySliceActions.replacePetsList({
                  list: data.result,
                })
              );
            }
            setIsLoading(false);
          })
          .catch((e) => {
            setError("Something went wrong.");
            setIsLoading(false);
          });
      } else {
        console.log("category " + category);
        await fetchPetsByCategory(category)
          .then((data) => {
            console.log("data");
            console.log(data);
            console.log("data");
            if (data.length === 0) {
              console.log("idhar aagaya");
              dispatch(
                inventorySliceActions.replacePetsList({
                  list: [],
                })
              );
              setError("No pets available.");
            } else {
              console.log("accha hey");
              dispatch(
                inventorySliceActions.replacePetsList({
                  list: data,
                })
              );
            }
            setIsLoading(false);
          })
          .catch((e) => {
            setError("Something went wrong.");
            setIsLoading(false);
          });
      }
    };

    fetchThePets();

    return () => {};
  }, [category, dispatch]);

  return (
    <div className="flex flex-col items-start mb-12  w-full">
      <p className="font-bold tracking-wider text-xl mb-5"> Explore by Breed</p>
      {isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
        </div>
      )}
      {!isLoading && pets.length === 0 && error === null && (
        <p className="my-20"> No pets available.</p>
      )}
      {!isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          {pets.map((pet) => {
            return (
              <PetItem
                pet={pet}
                key={pet._id}
                id={pet._id}
                type={pet.producttype}
                price={pet.price}
                name={pet.name}
                image={pet.image}
                breed={pet.breed}
              ></PetItem>
            );
          })}
        </div>
      )}
      {!isLoading && error !== null && <LoadError message={error}></LoadError>}
    </div>
  );
};

export default Breeds;
