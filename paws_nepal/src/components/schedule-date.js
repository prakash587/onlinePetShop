import {
  faClose,
  faCircle,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers";
import "../styles/date-picker.css";
import dayjs from "dayjs";

const ScheduleDate = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());

  const [selectedTime, setSelectedTime] = useState("");

  const times = ["9:00 PM", "10:00 PM", "11:00 PM", "1:00 AM", "1:30 AM"];

  return (
    <div
      className={`fixed bg-black overflow-y-auto overflow-hidden h-full w-full md:w-1/2 lg:w-2/5 z-10 top-0 right-0 transition-transform duration-1000 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col items-start justify-start py-10 gap-y-3 px-5 mt-16 w-full">
        <div className="flex flex-row justify-between items-center w-full mb-2">
          <p className="font-bold tracking-wider text-xl">
            {" "}
            Schedule an Appointment
          </p>
          <FontAwesomeIcon
          onClick={toggleSidebar}
            className="text-xl bg-zinc-800"
            icon={faClose}
          ></FontAwesomeIcon>{" "}
        </div>
        <p className="text-start font-semibold text-zinc-500">
          {" "}
          Select a date and time below. If you don't see a time that works for
          you, please reach out to your vet.{" "}
        </p>
        <p className="text-start font-semibold text-lg"> Choose a date</p>
        <div className="flex flex-row justify-center w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              onChange={(newDate) => {
                setValue(newDate);
              }}
              label="Controlled picker"
              value={dayjs(value)}
              orientation="portrait"
            />
          </LocalizationProvider>
        </div>
        <p className="text-start font-semibold text-lg"> Available Times</p>
        {times.map((pm) => {
          return (
            <div
              onClick={() => {
                setSelectedTime(pm);
              }}
              className="flex flex-row items-center justify-between w-full px-3 py-3 rounded-lg border border-solid border-zinc-700 cursor-pointer"
            >
              <p className="font-semibold tracking-widest"> {pm} </p>

              {selectedTime === pm && (
                <FontAwesomeIcon
                  className="text-xl text-red-800"
                  icon={faCircleDot}
                ></FontAwesomeIcon>
              )}
              {selectedTime !== pm && (
                <FontAwesomeIcon
                  className="text-xl text-zinc-700"
                  icon={faCircle}
                ></FontAwesomeIcon>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleDate;
