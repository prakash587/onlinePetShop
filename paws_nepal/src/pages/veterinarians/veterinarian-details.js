import { Rating } from "@mui/material";
import React, { useState } from "react";
import ReviewItem from "../../components/review-item";
import WriteReview from "../../components/write-review";
import ScheduleDate from "../../components/schedule-date";

const VeterinarianDetails = () => {
  const [showWriteReview, setShowWriteReview] = useState(false);

  const toggleShowWriteReview = () => {
    setShowWriteReview(!showWriteReview);
  };

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Corrected the toggle logic
  };

  const expertises = [
    "Feline Medicine",
    "Internal Medicine",
    "Nutrition",
    "Surgery",
    "Pain Management",
  ];

  return (
    <div className="flex flex-col items-start justify-start px-10 md:px-36">
      {showMenu && (
        <div
          className="fixed top-0 right-0 h-full w-screen bg-black bg-opacity-35"
          onClick={toggleMenu}
        ></div>
      )}
      <ScheduleDate isOpen={showMenu} toggleSidebar={toggleMenu}></ScheduleDate>
      <p className="text-lg tracking-wider font-semibold text-zinc-500 mb-5">
        {" "}
        Veterinarians / <span className="text-white"> Emily </span>
      </p>
      <div className="flex flex-row items-center gap-x-6">
        <img
          className="h-28 w-28 rounded-full"
          src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*"
          alt="vet"
        />
        <div className="flex flex-col items-start justify-between">
          <p className="font-bold text-xl tracking-wider text-start">
            {" "}
            Dr. Emily Smith
          </p>
          <p className="text-zinc-500 font-semibold  tracking-wide text-start">
            {" "}
            Veterinarian | Phd{" "}
          </p>
          <p className="text-zinc-500 font-semibold text-sm  tracking-wide text-start">
            {" "}
            Veterinay Specialist in Animal Internal Medicine, Emergency and
            Critical Care
          </p>
        </div>
      </div>

      {/* ratings */}

      <div className="flex flex-col lg:flex-row gap-y-10 gap-x-5 mt-5 w-full lg:items-start lg:justify-between">
        <div className="flex flex-col lg:flex-row gap-x-5 gap-y-5">
          <div className="flex flex-col items-start justify-start gap-y-1">
            <p className="font-bold tracking-wide text-xl"> 4.5</p>
            <Rating
              name="simple-controlled"
              value={4.5}
              precision={0.5}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "red", // Change the filled star color
                },
                "& .MuiRating-iconEmpty": {
                  borderColor: "red", // Change the border color
                },
                "& .MuiSvgIcon-root": {
                  fill: "red", // Make the unfilled stars transparent
                  //   stroke: "red", // Change the border color of the unfilled stars
                },
              }}
            />
            <p className="text-sm"> 1200 reviews</p>
          </div>
          <div className="w-full flex flex-col gap-y-3">
            <div className="flex flex-row items-center gap-x-2">
              <p>5</p>
              <div className="h-3 rounded-md w-96 bg-zinc-600 relative">
                <div
                  style={{
                    width: "68%",
                  }}
                  className="h-3 rounded-md w-full bg-red-600 absolute left-0"
                ></div>
              </div>
              <p> 68%</p>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <p>4</p>
              <div className="h-3 rounded-md w-96 bg-zinc-600 relative">
                <div
                  style={{
                    width: "15%",
                  }}
                  className="h-3 rounded-md w-full bg-red-600 absolute left-0"
                ></div>
              </div>
              <p> 15%</p>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <p>3</p>
              <div className="h-3 rounded-md w-96 bg-zinc-600 relative">
                <div
                  style={{
                    width: "8%",
                  }}
                  className="h-3 rounded-md w-full bg-red-600 absolute left-0"
                ></div>
              </div>
              <p> 8%</p>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <p>2</p>
              <div className="h-3 rounded-md w-96 bg-zinc-600 relative">
                <div
                  style={{
                    width: "3%",
                  }}
                  className="h-3 rounded-md w-full bg-red-600 absolute left-0"
                ></div>
              </div>
              <p> 3%</p>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <p>1</p>
              <div className="h-3 rounded-md w-96 bg-zinc-600 relative">
                <div
                  style={{
                    width: "5%",
                  }}
                  className="h-3 rounded-md w-full bg-red-600 absolute left-0"
                ></div>
              </div>
              <p> 5%</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-start">
          <div
            onClick={toggleShowWriteReview}
            className="bg-zinc-800 px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-red-600 font-semibold"
          >
            {" "}
            Write a Review
          </div>
          {showWriteReview && (
            <WriteReview
              showWriteReview={showWriteReview}
              close={toggleShowWriteReview}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col items-start w-full mt-4">
        <p className="tracking-wider mt-6 mb-5 text-xl font-bold">
          {" "}
          Biography{" "}
        </p>
        <p className="text-start font-normal tracking-wider">
          {" "}
          Deboned chicken, chicken meal, brown rice, barley, oatmeal, chicken
          fat (preserved with mixed tocopherols), flaxseed, natural flavor,
          choline chloride, taurine, dried chicory root, Yucca schidigera
          extract, vitamins (vitamin E supplement, niacin supplement, thiamine
          mononitrate, d-calcium pantothenate, vitamin A supplement, pyridoxine
          hydrochloride, riboflavin supplement, vitamin D3 supplement, biotin,
          vitamin B12 supplement, folic acid), minerals (ferrous sulfate, zinc
          oxide, calcium carbonate, manganous oxide, copper sulfate, iron amino
          acid chelate, manganese amino acid chelate, zinc amino acid chelate,
          copper amino acid chelate, sodium selenite, cobalt carbonate,
          ethylenediamine dihydriodide), potassium chloride, dried Lactobacillus
          plantarum fermentation product, dried Enterococcus faecium
          fermentation product, dried Bacillus subtilis fermentation product,
          dried Bifidobacterium animalis fermentation product, dried
          Lactobacillus casei fermentation product, dried Lactobacillus
          acidophilus fermentation product.
        </p>
      </div>

      <div style={{ height: "0.5px" }} className="w-full bg-white my-5"></div>
      <div className="flex flex-row justify-between w-full tracking-wider">
        <div className="flex flex-col items-start w-1/2 gap-y-1">
          <p className="text-zinc-500"> Education</p>
          <p className="text-start">
            Doctor of Vetnary Medicined, University of Pokhara
          </p>
        </div>
        <div className="flex flex-col items-start w-1/2 gap-y-1">
          <p className="text-zinc-500"> Experience</p>
          <p className="text-start">
            Associate Veterinarian, Paws and Claws Pet Hospital
          </p>
        </div>
      </div>
      <div style={{ height: "0.5px" }} className="w-full bg-white my-5"></div>
      <div className="flex flex-row justify-between w-full tracking-wider">
        <div className="flex flex-col items-start w-1/2 gap-y-1">
          <p className="text-zinc-500"> Certifications</p>
          <p className="text-start">Board Certified in Feline Medicines</p>
        </div>
      </div>
      <div style={{ height: "0.5px" }} className="w-full bg-white my-5"></div>
      <p className="tracking-wider mt-6 mb-5 text-xl font-bold"> Expertises</p>
      <div className="flex flex-row flex-wrap w-full gap-x-3 gap-y-3">
        {expertises.map((expertise) => {
          return (
            <div className="px-3 py-1.5 rounded-md bg-zinc-700 cursor-pointer hover:bg-red-600 transition-all duration-500 ease-out">
              {" "}
              {expertise}{" "}
            </div>
          );
        })}
      </div>

      <div
        onClick={toggleMenu}
        className="mt-7 bg-red-500 text-center rounded-md px-7 py-2 hover:bg-red-700 transition-all duration-700 cursor-pointer w-full md:w-2/3 lg:w-1/3"
      >
        {" "}
        Schedule an Appointment
      </div>

      {/* reviews */}
      <div id="reviews-section" className="flex flex-col items-start w-full">
        <p className="font-semibold tracking-wider mt-6 mb-5"> Reviews </p>
        <ReviewItem></ReviewItem>
        <ReviewItem></ReviewItem>
        <ReviewItem></ReviewItem>
        <ReviewItem></ReviewItem>
      </div>
    </div>
  );
};

export default VeterinarianDetails;
