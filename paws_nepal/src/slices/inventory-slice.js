import { createSlice } from "@reduxjs/toolkit";

const initialInventoryState = { pets: [], petFoods: [], petAccessories: [] };

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialInventoryState,
  reducers: {
    replacePetsList(state, action) {
      state.pets = action.payload.list;
    },
    replacePetFoodsList(state, action) {
      state.petFoods = action.payload.list;
    },
    replacePetAccessoriesList(state, action) {
      state.petAccessories = action.payload.list;
    },
    deletePet(state, action) {
      state.pets = state.pets.filter((pet) => pet._id !== action.payload.id);
    },
    deletePetFood(state, action) {
      state.pets = state.petFoods.filter((petFood) => petFood._id !== action.payload.id);
    },
    deletePetAccessory(state, action) {
      state.pets = state.petAccessories.filter((petAccessory) => petAccessory._id !== action.payload.id);
    },
  },
});

export default inventorySlice;

export const inventorySliceActions = inventorySlice.actions;
