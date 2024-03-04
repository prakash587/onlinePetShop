import React, { useState, useEffect, useRef } from "react";
import PetItemShimmer from "../../utilities/shimmers/pet-item-shimmer";
import PetItem from "../../components/pet-item";
import LoadError from "../category/load-error";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  });

  return (
    <div className="flex flex-col items-start px-10 md:px-36 w-full">
      <p className="tracking-wider text-2xl font-semibold mb-3"> Search</p>
      <input
        onChange={(e) => {
          setSearchValue(e.target.value);
          setTimeout(() => {
            setIsLoading(false);
            setError("Wifi went down");
          }, 2000);
        }}
        placeholder="Start searching ..."
        className="  px-3 py-2 mb-7 rounded-sm border border-solid bg-zinc-900 border-zinc-600 w-full md:w-2/3 lg:w-1/3"
      ></input>
      {isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
          <PetItemShimmer></PetItemShimmer>
        </div>
      )}
      {!isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          <PetItem></PetItem>
          <PetItem></PetItem>
          <PetItem></PetItem>
          <PetItem></PetItem>
          <PetItem></PetItem>
          <PetItem></PetItem>
        </div>
      )}
      {!isLoading && error !== null && <LoadError></LoadError>}
    </div>
  );
};

export default Search;
