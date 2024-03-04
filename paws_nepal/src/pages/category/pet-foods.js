import React, { useEffect, useState } from "react";
import { PetFoodItem } from "../../components/pet-item";
import PetItemShimmer from "../../utilities/shimmers/pet-item-shimmer";
import LoadError from "./load-error";
import { inventorySliceActions } from "../../slices/inventory-slice";
import {
  fetchPetFoods,
  fetchPetFoodsByCategory,
} from "../../action-creators/inventory-action";
import { useDispatch, useSelector } from "react-redux";

const PetFoods = ({ category }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const inventoryState = useSelector((state) => {
    return state.inventory;
  });

  const petFoods = inventoryState.petFoods;

  useEffect(() => {
    const fetchThePetFoods = async () => {
      setIsLoading(true);
      setError(null);
      if (category === "All") {
        await fetchPetFoods()
          .then((data) => {
            if (data.result.length === 0) {
              dispatch(
                inventorySliceActions.replacePetFoodsList({
                  list: [],
                })
              );
              setError("No pet foods available.");
            } else {
              dispatch(
                inventorySliceActions.replacePetFoodsList({
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
        await fetchPetFoodsByCategory(category)
          .then((data) => {
            if (data.length === 0) {
              dispatch(
                inventorySliceActions.replacePetFoodsList({
                  list: [],
                })
              );
              setError("No pet foods available.");
            } else {
              dispatch(
                inventorySliceActions.replacePetFoodsList({
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

    fetchThePetFoods();
  }, [dispatch, category]);
  return (
    <div className="flex flex-col items-start mb-12  w-full">
      <p className="font-bold tracking-wider text-xl mb-5"> Pet Foods</p>
      {isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
        </div>
      )}

      {!isLoading && petFoods.length === 0 && error === null && (
        <p className="my-20"> No pet foods available.</p>
      )}
      {!isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          {petFoods.map((petFood) => {
            return (
              <PetFoodItem
                petFood={petFood}
                key={petFood._id}
                id={petFood._id}
                type={petFood.producttype}
                price={petFood.price}
                name={petFood.name}
                image={petFood.image}
                brand={petFood.brand}
              ></PetFoodItem>
            );
          })}
        </div>
      )}
      {!isLoading && error !== null && <LoadError message={error}></LoadError>}
    </div>
  );
};

export default PetFoods;
