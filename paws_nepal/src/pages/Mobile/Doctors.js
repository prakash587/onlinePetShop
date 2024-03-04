import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";

const DoctorCard = ({ name, specialty, rating, location, image }) => (
  <div>
    <div>
      <img className="object-cover lg:w-11/12 " alt="Doctor" src={image} />
    </div>
    <div className="mt-4 text-left px-2" style={{ width: "90%" }}>
      <h1 className="font-semibold text-xl text-gray-700">{name}</h1>
      <div className="flex justify-between">
        <button className="mt-4 px-6 py-1 bg-sky-200 text-sky-700 rounded-xl font-semibold ">
          {specialty}
        </button>
        <p className="mt-5">
          {rating} <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-xs font-semibold mt-5">{location}</p>
        <button className="border border-black rounded-full px-3 py-1 mt-3 hover:transform hover:translate-x-2 transition-transform duration-300 ease-in-out">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  </div>
);

const DoctorsGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Sample data
  const doctorsData = [
    {
      name: "Dr. Sagar Prajapati",
      specialty: "Surgeon",
      rating: 4.5,
      location: "Grande Hospital, Tokha",
      image: process.env.PUBLIC_URL + "/img/doctor-1.png",
    },
    {
      name: "Dr. Sagar Sunar",
      specialty: "Surgeon",
      rating: 4.5,
      location: "Grande Hospital, Tokha",
      image: process.env.PUBLIC_URL + "/img/doctor-1.png",
    },
    {
      name: "Dr. Prabin Danuwar",
      specialty: "Surgeon",
      rating: 4.5,
      location: "Grande Hospital, Tokha",
      image: process.env.PUBLIC_URL + "/img/doctor-1.png",
    },
    // Add more doctors as needed
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    // Initial check on mount
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % doctorsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + doctorsData.length) % doctorsData.length
    );
  };

  return (
    <div
      className={`relative lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-10 mt-20 `}
    >
      {doctorsData.map((doctor, index) => (
        <div
          key={index}
          className={`w-full ${
            !isSmallScreen || index === currentIndex ? "block" : "hidden"
          }`}
        >
          <DoctorCard {...doctor} />
        </div>
      ))}
      {isSmallScreen && (
        <>
          <button
            className="relative left-0 top-10 transform -translate-y-1/2 text-slate-100 px-2 py-1 rounded-xl text-lg bg-blue-400 "
            onClick={handlePrev}
          >
            {"<"}
          </button>
          <button
            className="relative right-0 top-10 transform -translate-y-1/2 text-slate-100 px-2 py-1 rounded-xl text-lg bg-blue-400"
            onClick={handleNext}
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
};

export default DoctorsGrid;
