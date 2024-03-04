import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  faCircleExclamation,
  faCalendarDays,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import RatingPopup from "./rating_pop_up";
import { useSelector } from "react-redux";
import { fetchDoctorById } from "../../action-creators/doctor-list-action";

const DoctorDetailsPage = () => {
  const { doctorId } = useParams();

  const scrollRef = useRef(0);

  const [value, setValue] = React.useState(4);

  const items = [
    { icon: faCalendarDays, text: "Availability" },
    { icon: faLocationDot, text: "Location" },
    { icon: faStar, text: "Rating & Reviews" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const fetchDoctorDetails = async () => {
    setIsLoading(true);
    await fetchDoctorById(doctorId)
      .then((data) => {
        setDoctorData(data.result);

        setIsLoading(false);
        setError(null);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
        toast.error(e.message);
      });
    setIsLoading(false);
  };

  const [isPopupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorDetails();
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <main>
      {isPopupVisible && (
        <div
          onClick={() => {
            setPopupVisible(false);
          }}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
      )}

      {isPopupVisible && (
        <RatingPopup
          doctorId={doctorId}
          isPopupVisible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        />
      )}
      {isLoading && (
        <div className="h-28 w-full text-center mt-20">
          <ClipLoader></ClipLoader>
        </div>
      )}
      {!isLoading && doctorData !== null && (
        <div className="sm:w-5/6 lg:w-4/6 flex my-0 mx-auto mt-24 flex-col lg:flex-row  ">
          <div className=" lft_con lg:w-2/5 sm:w-11/12 mx-auto">
            <div className="lg:w-10/12 shadow-sm shadow-slate-300 sm:w-full sm:mt-12">
              <div className="bg-zinc-800">
                <div className=" py-6">
                  <img
                    alt={doctorData.image}
                    src={`http://localhost:3009/uploads/${doctorData.image}`}
                    // style={{
                    //   width: "30%",
                    //   height: "20%",
                    //   borderRadius: "100%",
                    // }}
                    className="border border-solid border-white mx-auto lg:justify-center sm:justify-center object-cover h-24 w-24 rounded-full"
                  />
                </div>
                <div className="pb-10">
                  <p className="text-center lg:text-xl sm:text-md">
                    Dr. {doctorData.username}
                  </p>
                  <div className="flex lg:flex-row items-center justify-center mt-2 text-sm">
                    <p className="bg-red-600 text-white px-5 py-2 rounded-md align-center mr-4 w-fit">
                      {doctorData.specialization}
                    </p>
                    <p className=" text-gray-400">
                      {doctorData.experience} years Experience
                    </p>
                  </div>
                  {/* <div className="flex content-center place-content-center mt-2 ">
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    >
                      <Rating
                        name="simple-controlled"
                        value={doctorData.rating}
                      />
                    </Box> */}
                    {/* <p className="pl-2  text-gray-300 ">{doctorData.rating}</p> */}
                  {/* </div> */}
                  {/* <div className="w-full flex justify-around px-4 items-center border border-t-slate-200 pb-4 pt-4 mt-2 gap-x-4">
                    <div
                      onClick={() => {
                        if (doctorData.role !== "user") {
                          toast.error("Access denied.");
                        } else {
                          setPopupVisible(true);
                        }
                      }}
                      className="flex flex-row cursor-pointer justify-center sm:w-full text-sm font-bold gap-x-2 items-center bg-red-600 px-3 py-2 border border-gray-300"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        color="white"
                        className=" text-white lg:text-lg sm:text-lg cursor-pointer"
                      />
                      Rate Us
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="flex flex-row sm:hidden lg:flex lg:flex-row mt-10  px-4 py-4  lg:w-10/12 sm:w-full sm:mb-4 bg-zinc-800 justify-between items-center shadow-sm shadow-slate-400">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className=" text-red-600  text-lg "
              ></FontAwesomeIcon>
              <p className="px-4 w-full text-sm text-start">
                Please filter through the dates to find your desired appointment
                date.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:w-3/5 sm:w-full px-5">
            <div className="flex flex-row justify-start mt-5 gap-x-0 w-full ">
              <NavLink
                to={`/doctor-details/${doctorId}/appointmentdates`}
                className={(navData) =>
                  navData.isActive
                    ? "w-1/3  text-center inline-block px-12 py-5 border-b-4 border-red-700 text-white-500 transition-all duration-300  ease-in-out hover:bg-zinc-600 hover:text-black bg-zinc-800 "
                    : "w-1/3 text-center inline-block px-12 py-5 border-b-0 border-red-700 text-gray-500 transition-all duration-300  ease-in-out hover:bg-zinc-600 hover:text-black bg-zinc-800"
                }
              >
                <FontAwesomeIcon icon={items[0].icon} className="text-lg" />
              </NavLink>
              {/* <NavLink
                to={`/doctor-details/${doctorId}/ratings&reviews`}
                className={(navData) =>
                  navData.isActive
                    ? "w-1/3 text-center inline-block px-12 py-5 border-b-4 border-red-700 text-white-500 transition-all duration-300  ease-in-out hover:bg-zinc-600 hover:text-black bg-zinc-800"
                    : "w-1/3 text-center inline-block px-12 py-5 border-b-0 border-red-700 text-gray-500 transition-all duration-300  ease-in-out hover:bg-zinc-600 hover:text-black bg-zinc-800"
                }
              >
                <FontAwesomeIcon icon={items[2].icon} className="text-lg" />
              </NavLink> */}
            </div>
            <Outlet context={[doctorData]}></Outlet>
          </div>
        </div>
      )}
    </main>
  );
};

export default DoctorDetailsPage;
