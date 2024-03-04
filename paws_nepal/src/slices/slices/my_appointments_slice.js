import { createSlice } from "@reduxjs/toolkit";

const initialMyAppointmentsState = { myappointments: [] };

const myAppointmentsSlice = createSlice({
  name: "myappointments",
  initialState: initialMyAppointmentsState,
  reducers: {
    replaceMyAppointments: (state, action) => {
      state.myappointments = action.payload.appointments;
    },
    
  },
});

export default myAppointmentsSlice;

export const myAppointmentsSliceActions = myAppointmentsSlice.actions;
