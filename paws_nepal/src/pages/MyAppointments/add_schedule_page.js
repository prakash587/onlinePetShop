// AddAppointmentPage.js

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddSchedule = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });
  const token = authState.token;
  const timeStamp = Date.now();
  const [startDate, setStartDate] = useState(new Date(timeStamp));
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleAddAppointment = () => {
    if (startDate && startTime && endTime) {
      const newAppointment = {
        startTime,
        endTime,
      };

      setAppointments([...appointments, newAppointment]);
      setStartTime("");
      setEndTime("");
    } else {
      toast.error("Please fill in the fields.");
    }
  };

  const handleAddSchedule = async () => {
    try {
      const url = "http://localhost:3009/schedule/create-schedule";
      

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: startDate.toISOString().split("T")[0],
          timeslot: appointments,
        }),
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        toast.success(jsonData.message);
      } else {
        toast.error(jsonData.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="container mx-auto mt-20 lg:w-1/4 sm:w-4/6 flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-4">Add Appointment</h2>
      <div className="mb-4 w-full flex flex-col items-start">
        <label className="block - text-sm font-bold mb-2text-white">
          Date
        </label>
        <DatePicker
          className="py-1 border-2 border-solid border-orange-400 text-center bg-zinc-800"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setAppointments([]);
          }}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="mb-4 w-full flex flex-col items-start">
        <label className="block text- text-sm font-bold mb-2 text-white">
          Start Time
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border rounded px-3 py-2 w-full bg-zinc-800"
        />
      </div>
      <div className="mb-4 w-full flex flex-col items-start">
        <label className="block text- text-sm font-bold mb-2 text-white">
          End Time
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border rounded px-3 py-2 w-full bg-zinc-800"
        />
      </div>
      <button
        onClick={handleAddAppointment}
        className="bg-transparent text-green-400 border border-solid border-green-400 transition-all duration-300 rounded-sm ease-in-out  py-1 px-4 hover:text-white hover:bg-green-400"
      >
        Add Timestamp
      </button>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        {appointments.length === 0 && (
          <p> You haven't added any time stamps to your schedule.</p>
        )}
        <ul className="grid grid-cols-2 ">
          {appointments.length !== 0 &&
            appointments.map((appointment, index) => (
              <li
                key={index}
                className="border border-solid border-red-600 text-center mr-2 rounded-sm py-1 px-2 mb-2"
              >
                {appointment.startTime} {" - "}
                {appointment.endTime}
              </li>
            ))}
        </ul>
      </div>
      {appointments.length !== 0 && (
        <div className="flex flex-row justify-end ">
          <button
            onClick={handleAddSchedule}
            className="bg-transparent mb-5 text-red-600 border border-solid border-red-600 transition-all duration-300 rounded-sm ease-in-out  py-2 px-4 hover:text-white hover:bg-red-600"
          >
            Add Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSchedule;
