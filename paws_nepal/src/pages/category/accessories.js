import React, { useEffect, useState } from "react";
import PetItem, { PetAccessoryItem } from "../../components/pet-item";
import PetItemShimmer from "../../utilities/shimmers/pet-item-shimmer";
import LoadError from "./load-error";
import { fetchPetAccessories } from "../../action-creators/inventory-action";
import { inventorySliceActions } from "../../slices/inventory-slice";
import { useDispatch, useSelector } from "react-redux";

const Accessories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const inventoryState = useSelector((state) => {
    return state.inventory;
  });

  const petAccessories = inventoryState.petAccessories;

  useEffect(() => {
    const fetchThePetFoods = async () => {
      setIsLoading(true);
      await fetchPetAccessories()
        .then((data) => {
          if (data.result.length === 0) {
            dispatch(
              inventorySliceActions.replacePetAccessoriesList({
                list: [],
              })
            );
            setError("No products available.");
          } else {
            dispatch(
              inventorySliceActions.replacePetAccessoriesList({
                list: data.result,
              })
            );
          }

          setIsLoading(false);
        })
        .catch((e) => {
          setError(e.message);
          setIsLoading(false);
        });
    };

    fetchThePetFoods();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-start mb-12  w-full">
      <p className="font-bold tracking-wider text-xl mb-5">
        {" "}
        Explore Accessories
      </p>
      {isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
        </div>
      )}
      {!isLoading && petAccessories.length === 0 && error === null && (
        <p className="my-20"> No pet foods available.</p>
      )}
      {!isLoading && error === null && petAccessories.length !== 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          {petAccessories.map((accessory) => {
            return ( 
              <PetAccessoryItem
              petAccessory={accessory}
                key={accessory._id}
                id={accessory._id}
                type={accessory.producttype}
                price={accessory.price}
                name={accessory.name}
                image={accessory.image}
                brand={accessory.brand}
              ></PetAccessoryItem>
            );
          })}
        </div>
      )}
      {!isLoading && error !== null && <LoadError message={error}></LoadError>}
    </div>
  );
};

export default Accessories;
