import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../../css/home/section2.css";
import MobileCarousel from "../Mobile/Mobile";

const Section2 = ({
  firstClassName,
  secondClassName,
  thirdClassName,
  fourthClassName,
  fifthClassName,
}) => {
  return (
    <section class="second_container" className="pb-32 pt-12">
      <div className="lg:w-4/6 my-0 mx-auto">
        <div className="w-5/12 my-0 mr-auto ml-auto">
          <h1 className={`${firstClassName} text-4xl font-semibold`}>
            Providing the best medical Services
          </h1>
          <p className={`${secondClassName} mt-4`}>
            World class care for everyone. Our health system offers unmatched ,
            expert health care.
          </p>
        </div>
        {/* <MobileCarousel></MobileCarousel> */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-2 sm:flex sm:flex-col sm:w-full sm:justify-center mt-20">
          <div className={`${thirdClassName} w-10/12 sm:mx-auto sm:mb-10  `}>
            <img
              src="https://img.freepik.com/free-photo/image-asian-woman-doctor-nurse-found-smth-looking-through-magnifying-glass-stare-surprised_1258-83265.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697241600&semt=ais"
              alt="alt"
              className="h-3/5 object-cover"
            />
            <h3 className="text-2xl mt-5">Find a Doctor</h3>
            <p className="w-full mt-4">
              World-class for everyone. Our health System offers unmatched
              expert health care. From the lab to the clinic
            </p>
            <button className="bg-orange-200 text-gray-500  rounded-full px-5 py-1 mt-4 hover:transform transition-all  hover:translate-x-2 duration-300 ease-in-out">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className={`${fourthClassName} w-10/12 sm:mx-auto sm:mb-10`}>
            <img
              src="https://www.lifewire.com/thmb/YBQuRMKxxhx3Zb3uJ1x-QOT6VsM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Maplocation_-5a492a4e482c52003601ea25.jpg"
              alt="alt"
              className="h-3/5 object-cover"
            />
            <h3 className="text-2xl mt-5">Find a Location</h3>
            <p className="w-full mt-4">
              World-class care for everyone. Our health System offers
              unmatched,expert health care. From the lab to the clinic
            </p>
            <button className="bg-orange-200 text-gray-500  rounded-full px-5 py-1 mt-4 hover:transform transition-all  hover:translate-x-2 duration-300 ease-in-out">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div className={`${fifthClassName}  w-10/12 sm:mx-auto sm:mb-10`}>
            <img
              src="https://www.rsny.org/wp-content/uploads/2020/02/make-an-appointment.png"
              alt="alt"
              className="h-3/5 object-cover"
            />
            <h3 className="text-2xl mt-5">Book Appointment</h3>
            <p className="w-full mt-4">
              World-class care for everyone. Our health System offers
              unmatched,expert health care. From the lab to the clinic
            </p>
            <button className="bg-orange-200 text-gray-500  rounded-full px-5 py-1 mt-4 hover:transform transition-all  hover:translate-x-2 duration-300 ease-in-out">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
