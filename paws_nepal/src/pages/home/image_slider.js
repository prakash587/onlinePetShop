import {
  faAngleLeft,
  faAngleRight,
  faArrowAltCircleRight,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import toast from "react-hot-toast";
import { fetchSchedules } from "../../action-creators/doctor-list-action";

const ImageSlider = ({ doctors }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const authState = useSelector((state) => {
    return state.auth;
  });
  const token = authState.token;
  const timeStamp = Date.now();
  const [isLoading, setIsLoading] = useState(false);
  const [scheduletoday, setScheduleToday] = useState([]);

  const navigate = useNavigate();

  const navigateToDetailsPage = () => {
    navigate(
      `/doctor-details/${doctors[currentIndex].doctorId}/appointmentdates`
    );
  };

  const fetchDoctorSchedule = async (date, index) => {
    setScheduleToday([]);
    setIsLoading(true);
    try {
      await fetchSchedules(date, token, doctors[index].doctorId).then(
        (data) => {
          setIsLoading(false);
          setScheduleToday(data.result[0].timeslot);
        }
      );
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorSchedule(
      new Date(timeStamp).toISOString().split("T")[0],
      currentIndex
    );
  }, []);

  const goToPreviousSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? doctors.length - 1 : currentIndex - 1;
    fetchDoctorSchedule(
      new Date(timeStamp).toISOString().split("T")[0],
      newIndex
    );

    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const isLastSlide = currentIndex === doctors.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    fetchDoctorSchedule(
      new Date(timeStamp).toISOString().split("T")[0],
      newIndex
    );

    setCurrentIndex(newIndex);
  };

  return (
    <div className="flex flex-row justify-around items-center mb-16">
      <FontAwesomeIcon
        icon={faAngleLeft}
        className="text-xl hover:text-red-500 cursor-pointer"
        onClick={goToPreviousSlide}
      ></FontAwesomeIcon>
      <div className="h-full w-5/6  flex flex-col md:flex-col lg:flex-row">
        <div className="w-full md:width-full lg:w-1/3 lg:rounded-l-lg bg-zinc-800 flex flex-row px-5 py-5 gap-x-5 border border-solid border-gray-500">
          <div className="flex flex-col justify-start ">
            <img
              className="h-28 w-28 rounded-full border border-solid border-gray-500 object-cover"
              src={`http://localhost:3009/uploads/${doctors[currentIndex].image}`}
              alt={doctors[currentIndex].image}
            ></img>
          </div>
          <div className="flex flex-col items-start gap-y-2">
            <p className="font-bold text-2xl pb-5">
              {" "}
              Dr. {doctors[currentIndex].name}
            </p>
            <div className="flex flex-row items-center pb-3 justify-start">
              <FontAwesomeIcon
                className="text-md text-white mr-1"
                icon={faCircleDot}
              ></FontAwesomeIcon>{" "}
              <p className="text-md text-white">
                {" "}
                Specialization: {doctors[currentIndex].specialization}
              </p>
            </div>
            <div className="flex flex-row items-center pb-3">
              <FontAwesomeIcon
                className="text-md text-white mr-1"
                icon={faCircleDot}
              ></FontAwesomeIcon>{" "}
              <p className="text-md text-white">
                {" "}
                Experience: {doctors[currentIndex].experience} Years
              </p>
            </div>

            <div
              onClick={navigateToDetailsPage}
              className="flex cursor-pointer flex-row items-center border border-solid border-red-500 rounded-sm hover:bg-red-500 bg-transparent text-red-500 py-1.5 px-4   hover:text-white transition-all duration-300  ease-in-out"
            >
              <FontAwesomeIcon
                className="pr-3"
                icon={faArrowAltCircleRight}
              ></FontAwesomeIcon>
              <div className="">View Details</div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-full lg:w-2/3 justify-between bg-zinc-800 px-10 py-5 flex flex-col lg:rounded-r-lg border border-solid border-t-gray-400 border-r-gray-400 border-b-gray-400">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <p className="text-xl  text-white"> Date</p>
              <p className="text-lg  text-white"> Available Times</p>
            </div>

            <div className="h-0.5 my-3 w-full bg-white"></div>
            <div className="flex flex-row justify-between">
              <p className="text-sm  text-white">
                {" "}
                {new Date(timeStamp).toISOString().split("T")[0]}
              </p>
              {isLoading && <div></div>}
              {!isLoading && scheduletoday.length === 0 && (
                <p className="text-end"> No Schedules for today.</p>
              )}
              {!isLoading && scheduletoday.length !== 0 && (
                <div
                  className="w-2/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
                  dir="rtl"
                >
                  {scheduletoday.map((schedule) => {
                    return (
                      //   <div className="text-white bg-slate-500 border-rounded py-1.5 cursor-pointer hover:bg-slate-700 transition-all">
                      //     {" "}
                      //     {schedule.startTime}
                      //   </div>
                      <BookDateAlertDialog
                        doctorId={doctors[currentIndex].doctorId}
                        schedule={schedule}
                        date={new Date(timeStamp)}
                        token={token}
                      ></BookDateAlertDialog>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div
            onClick={navigateToDetailsPage}
            className="flex justify-center mt-3 cursor-pointer flex-row items-center border border-solid border-red-500 rounded-sm hover:bg-red-500 bg-transparent text-red-500 py-1.5 px-4   hover:text-white transition-all duration-300  ease-in-out"
          >
            <div className="pr-2">Check for other apppointment dates</div>
            <FontAwesomeIcon
              className="pr-3"
              icon={faArrowAltCircleRight}
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faAngleRight}
        className="text-xl hover:text-red-500 cursor-pointer"
        onClick={goToNextSlide}
      ></FontAwesomeIcon>
    </div>
  );
};

export default ImageSlider;

const BookDateAlertDialog = ({ doctorId, schedule, date, token }) => {
  const [isBooked, setIsBooked] = useState(schedule.booked);

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
        setIsBooked(true);
        toast.success(jsonData.message);
      } else {
        toast.error(jsonData.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className={`${
            isBooked ? "bg-slate-500 cursor-not-allowed" : "bg-green-400"
          } text-white  border-rounded py-1.5 cursor-pointer hover:bg-slate-700 transition-all`}
        >
          {schedule.startTime}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            This action cannot be undone. Do you really want to book the
            appointment ?
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-mauve11 bg-gray-400 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={bookAppointment}
                className="text-red11 bg-red-400 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
              >
                Yes, Book Appointment
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
