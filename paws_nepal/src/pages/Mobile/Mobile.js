import React, { useState, useEffect } from "react";

const MobileCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const medicalData = [
    {
      image:
        "https://img.freepik.com/free-photo/image-asian-woman-doctor-nurse-found-smth-looking-through-magnifying-glass-stare-surprised_1258-83265.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697241600&semt=ais",
      title: "Find a Doctor",
      description:
        "World-class for everyone. Our health System offers unmatched expert health care. From the lab to the clinic",
    },
    {
      image:
        "https://www.lifewire.com/thmb/YBQuRMKxxhx3Zb3uJ1x-QOT6VsM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Maplocation_-5a492a4e482c52003601ea25.jpg",
      title: "Find a Location",
      description:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic",
    },
    {
      image:
        "https://www.rsny.org/wp-content/uploads/2020/02/make-an-appointment.png",
      title: "Book Appointment",
      description:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600); // Adjust the threshold as needed
    };

    // Initial check on mount
    handleResize();

    // Event listener for screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % medicalData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + medicalData.length) % medicalData.length
    );
  };

  return (
    <div
      className={`${
        isSmallScreen
          ? "flex sm:flex-row lg:mt-20 gap-x-6 lg:w-full sm:w-4/6 sm:my-4 sm:mx-auto relative sm-overflow-hidden"
          : "flex gap-x-6 lg:mt-20 lg:w-full sm:w-4/6 sm:my-4 sm:mx-auto relative"
      }`}
    >
      {isSmallScreen && (
        <>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2  text-slate-100 px-2 py-1 rounded-xl text-lg bg-blue-400 "
            onClick={handlePrev}
          >
            {"<"}
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-slate-100  px-2 py-1 rounded-xl text-lg bg-blue-400"
            onClick={handleNext}
          >
            {">"}
          </button>
        </>
      )}
      {medicalData.map((data, index) => (
        <div
          key={index}
          className={`w-full ${
            !isSmallScreen || index === currentIndex ? "block" : "hidden"
          }`}
        >
          <img
            src={data.image}
            alt="alt"
            className="h-3/5 object-cover w-full"
          />
          <h3 className="text-2xl mt-5">{data.title}</h3>
          <p className="w-full mt-4">{data.description}</p>
          {isSmallScreen && (
            <button className="bg-orange-200 text-gray-500 rounded-full px-5 py-1 mt-4 hover:transform transition-all hover:translate-x-2 duration-300 ease-in-out">
              {">"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileCarousel;
