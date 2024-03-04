import { createSlice } from "@reduxjs/toolkit";

const initialState = { requests: [] };

const doctorapplicationsslice = createSlice({
  name: "doctorapplications",
  initialState: initialState,
  reducers: {
    replaceDoctorApplications(state, action) {
      state.requests = action.payload.requests;
    },
    removeFromPending(state, action) {
      state.requests = state.requests.filter(
        (request) => request.doctorId !== action.payload.id
      );
      
    },
  },
});

export default doctorapplicationsslice;

export const doctorapplicationsactions = doctorapplicationsslice.actions;
