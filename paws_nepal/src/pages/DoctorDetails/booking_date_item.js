import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BookingDateItem = ({ doctorData, schedule, date }) => {
  const authState = useSelector((state) => {
    return state.auth;
  });

  const [booked, setBooked] = useState(schedule.booked);

  const token = authState.token;
  const { doctorId } = useParams();

  const bookAppointment = async () => {
    const url = `http://localhost:3009/appointment/book-appointment/${doctorId}`;
    try {
      const response = await fetch(url, {
        method: "POST",

        body: JSON.stringify({
          date: date.toISOString().split("T")[0],
          timeId: schedule._id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        setBooked(true);
        toast.success(jsonData.message);
      } else {
        toast.error(jsonData.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex flex-col mt-3 cursor-pointer">
      <div className="flex flex-row justify-between items-center px-6 transition-all hover:translate-x-2 ">
        <div className="flex flex-col mb-3">
          <p className="text-sm font-semibold text-white tracking-wider">
            {" "}
            {schedule.startTime} - {schedule.endTime}
          </p>
          <p className="text-sm text-white tracking-wider font-bold"> {doctorData.email}</p>
        </div>
        {booked && (
          <button className="px-3 cursor-not-allowed py-1 rounded-sm hover:text-white hover:bg-green-400 border border-solid border-green-400 bg-zinc-700  text-sm  text-green-400 font-semibold">
            Booked
          </button>
        )}
        {!booked && (
          <button
            disabled={schedule.booked}
            onClick={() => {
              bookAppointment();
            }}
            className="px-3 py-1 rounded-sm hover:text-white hover:bg-red-600 border border-solid border-red-600 bg-zinc-700 cursor-pointer text-sm  text-red-600 font-semibold"
          >
            Book
          </button>
        )}
      </div>

      <div className="bg-gray-400 w-full h-0.5"></div>
    </div>
  );
};

export default BookingDateItem;
