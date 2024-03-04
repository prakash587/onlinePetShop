import { createSlice } from "@reduxjs/toolkit";

const initialDoctorsListState = { doctorsList: [] };

const doctorsListSlice = createSlice({
  name: "doctorslist",
  initialState: initialDoctorsListState,
  reducers: {
    replaceDoctorsList(state, action) {
      state.doctorsList = action.payload.list;
    },
  },
});

export default doctorsListSlice;

export const doctorsListSliceActions = doctorsListSlice.actions;
