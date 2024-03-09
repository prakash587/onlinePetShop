import {
  faCat,
  faDog,
  faFishFins,
  faKiwiBird,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomePageDetails from "./home-details";

const Home = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  

  const scrollRef = useRef(0);

  const categories = [
    {
      name: "Dogs",
      icon: faDog,
    },
    {
      name: "Cats",
      icon: faCat,
    },
    {
      name: "Birds",
      icon: faKiwiBird,
    },
    {
      name: "Fishes",
      icon: faFishFins,
    },
    {
      name: "Others",
      icon: faPaw,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  });

  return (
    <div className="flex flex-col md:flex-row w-full gap-x-4 px-4 md:px-7 lg:px-11">
      <div className="flex flex-col w-full md:w-1/4 h-fit gap-y-28">
        <div className="flex flex-row flex-wrap items-center md:flex-col w-full md:items-start md:justify-start">
          <p className="hidden md:flex mb-5 font-semibold tracking-wider text-lg">
            {" "}
            Categories:{" "}
          </p>
          {categories.map((theCategory) => {
            return (
              <div
                key={theCategory.name}
                onClick={() => {
                  navigate(`/category/${theCategory.name}`);
                }}
                className={` ${
                  category === theCategory.name ? "bg-red-600" : ""
                } flex flex-row gap-x-3 items-center hover:bg-zinc-800 px-3 py-2 rounded-lg mb-2 transition-all ease-out duration-700 cursor-pointer`}
              >
                <FontAwesomeIcon icon={theCategory.icon}></FontAwesomeIcon>
                <p> {theCategory.name} </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* main-div */}
      <div className="flex flex-col w-full md:w-3/4 items-start">
        <HomePageDetails></HomePageDetails>
      </div>
    </div>
  );
};

export default Home;
