import React, { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AddAppointmentButton from "./add_appointment_button";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import AppointmentList from "./appointment_list";
import { fetchMyAppointments } from "../../action-creators/my_appointments_action";
import { myAppointmentsSliceActions } from "../../slices/my_appointments_slice";

const MyAppointments = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });
  const token = authState.token;

  const myApppointmentsState = useSelector((state) => {
    return state.myappointments;
  });

  const appointmentsList = myApppointmentsState.myappointments;
  const [theAppointmentsList, setAppointmentsList] = useState(appointmentsList);

  const dispatch = useDispatch();

  const role = authState.user.role;

  const [selectedAppointmentStatus, setAppointmentStatus] = useState("All"); // Initialize with "Eye Surgeon"

  // Function to handle the doctor selection

  const handleDoctorSelection = (status) => {
    setAppointmentStatus(status);
    if (status === "All") {
      setAppointmentsList(appointmentsList);
    } else {
      let appointments = appointmentsList.filter(
        (appointment) => appointment.status === status
      );
      setAppointmentsList(appointments);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, sethasError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const scrollRef = useRef(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      await fetchMyAppointments(token)
        .then((data) => {
          dispatch(
            myAppointmentsSliceActions.replaceMyAppointments({
              appointments: data.result,
            })
          );
          setAppointmentsList(data.result);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    };
    fetchAppointments();
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    window.scrollTo(0, scrollRef.current);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, token]);
  return (
    <div className="pb-24 flex pt-24">
      <div className="lg:w-full flex my-0  sm:px-2 md:px-20 lg:px-56 pt-4 flex-col w-full">
        <div className="flex sm:flex-col lg:flex-row justify-between items-center w-full">
          <div className="flex flex-row w-full justify-between">
            <div className="sm:mt-5 lg:mt-0 sm:w-full lg:w-fit">
              <div className=" border border-solid border-black flex justify-start sm:w-max  ">
                <select
                  value={selectedAppointmentStatus}
                  onChange={(e) => handleDoctorSelection(e.target.value)}
                  className="px-2 py-2 bg-zinc-700"
                >
                  <option value="All" className="px-1 py-2">
                    <p>All</p>
                  </option>
                  <option value="Pending" className="px-1 py-2">
                    <p>Pending</p>
                  </option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="sm:w-full lg:w-fit sm:mt-5 lg:mt-0 sm:text-sm lg:text-md flex sm:justify-end">
              {role === "doctor" && (
                <AddAppointmentButton></AddAppointmentButton>
              )}
            </div>
          </div>
        </div>
        <div className="bg-zinc-700 mt-5  px-2 md:px-5 py-3 rounded-md w-full">
          <h1 className="text-white font-bold ">Appointments</h1>

          <div className="flex w-full justify-between mb-5">
            {/* {windowWidth >= 800 && role !== "patient" && ( */}
            <div className="text-white font-bold  w-1/4 flex flex-row justify-start">
              Doctor
            </div>
            {/* )}  */}
            {/* {windowWidth >= 800 && role !== "doctor" && ( */}
            <div className="text-white font-bold w-1/4 flex flex-row justify-center">
              Patient
            </div>
            {/* )}  */}
            <div className="text-white font-bold w-1/4 flex flex-row justify-center">
              Start Time
            </div>
            <div className="text-white font-bold w-1/4 flex flex-row justify-center">
              Actions
            </div>
            {/* <div className="text-white font-bold w-1/4 flex flex-row justify-center">
              Action
            </div> */}
          </div>
          {isLoading && (
            <div className="text-center">
              {" "}
              <ClipLoader></ClipLoader>
            </div>
          )}
          {!isLoading && theAppointmentsList.length > 0 && (
            <AppointmentList
              appointments={theAppointmentsList}
            ></AppointmentList>
          )}
          {!isLoading && theAppointmentsList.length <= 0 && (
            <div className="text-center"> No appointments till date !</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
