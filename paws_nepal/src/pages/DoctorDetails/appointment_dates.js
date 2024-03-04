import BookingDateItem from "./booking_date_item";
import DatePicker from "react-datepicker";
import { useOutletContext } from "react-router-dom/dist";
import React, { useState } from "react";
import { useParams } from "react-router-dom/dist";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchSchedules } from "../../action-creators/doctor-list-action";

const AppointmentDates = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });
  const token = authState.token;
  const { doctorId } = useParams();
  console.log(doctorId);
  const timeStamp = Date.now();
  const dateObject = new Date(timeStamp);
  const [selectedDate, setSelectedDate] = useState(dateObject);
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const [doctorData] = useOutletContext();
  console.log("appointment dates ma doctor data");
  console.log(doctorData);
  console.log("appointment dates ma doctor data");

  const fetchDoctorSchedule = async (date) => {
    // const formattedDate = date.toISOString().split("T")[0];
    setSchedule([]);
    setIsLoading(true);
    try {
      await fetchSchedules(date, token, doctorId).then((data) => {
        setIsLoading(false);
        console.log(data.result[0].timeslot);
        setSchedule(data.result[0].timeslot);
      });
    } catch (e) {
      setIsLoading(false);
      console.log(e.message);
    }
  };

  useEffect(() => {
    const timeStamp = Date.now();
    fetchDoctorSchedule(new Date(timeStamp).toISOString().split("T")[0]);
  }, []);

  return (
    <div className="text-start">
      <div className="my-4">
        {/* <button
          onClick={handlePreviousDay}
          className="bg-gray-300  hover:bg-gray-400 text-gray-600 py-2 px-3 rounded-l-md"
        >
          &#8249;
        </button> */}
        <DatePicker
          style={{ zIndex: 0 }}
          className=" text-center border-2 border-solid border-orange-400 py-1 rounded-sm bg-zinc-700"
          selected={selectedDate}
          onChange={async (date) => {
            console.log(date);
            setSelectedDate(date);

            fetchDoctorSchedule(date.toISOString().split("T")[0]);
          }}
          dateFormat="yyyy-MM-dd"
        />
        {/* <ReactDatePicker
          className="text-center text-orange-500 font-semibold text-sm border-none focus:outline-none hover:outline-none"
          selected={selectedDate}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => {
            setSelectedDate(date);
            fetchDoctorSchedule(date);
          }}
          showYearDropdown
          scrollableYearDropdown
          todayButton="Today"
          placeholderText="Select a date"
        ></ReactDatePicker> */}
        {/* <button
          onClick={handleNextDay}
          className="bg-gray-300 hover:bg-gray-400 text-gray-600 py-2 px-3 rounded-r-md"
        >
          &#8250;
        </button> */}
      </div>
      {!isLoading && schedule.length === 0 && (
        <p className="text-center"> No schedule found.</p>
      )}

      <div className="shadow-md w-full h-96 overflow-y-auto overflow-hidden border border-solid border-white">
        {schedule.length !== 0 &&
          schedule.map((schedule) => {
            return (
              <BookingDateItem
                doctorData={doctorData}
                date={selectedDate}
                schedule={schedule}
              ></BookingDateItem>
            );
          })}
      </div>
    </div>
  );
};
export default AppointmentDates;
