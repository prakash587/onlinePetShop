import React, { useEffect, useState, useRef } from "react";
import AddPet from "./add-pet";
import AddPetFood from "./add-petfood";
import AddAccessories from "./add-accessories";

const AddInventory = () => {
  const [selectedCategory, setSelectedCategory] = useState("Pet");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const scrollRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  });

  return (
    <div className="flex flex-col items-start px-10 md:px-36 w-full">
      <div className="flex flex-col gap-y-8 items-start md:flex-row md:items-center md:justify-between w-full mb-8">
        <p className="text-lg tracking-wider font-semibold text-zinc-500">
          Inventory / <span className="text-white"> Add Inventory </span>
        </p>
        <div className="flex flex-row items-center">
          <label htmlFor="category" className="tracking-wider pr-2">
            Select:
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md px-3 py-2 bg-zinc-900"
          >
            <option value="Pet">Pet</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>
      <div className=""> View Inventory </div>
      {selectedCategory === "Pet" && <AddPet></AddPet>}
      {selectedCategory === "Pet Food" && <AddPetFood></AddPetFood>}
      {selectedCategory === "Accessories" && <AddAccessories></AddAccessories>}
    </div>
  );
};

export default AddInventory;
