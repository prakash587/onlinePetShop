import { Rating } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ReviewItem from "../../components/review-item";
import WriteReview from "../../components/write-review";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { cartSliceActions } from "../../slices/cart-slice";
import { fetchFeedbacks } from "../../action-creators/feedback-action";

const PetAccessoryDetails = () => {
  const [selectedTab, setSelectedTab] = useState("Details");

  const [selectedSize, setSelectedSize] = useState("Small");

  const sizes = ["Small", "Medium", "Large", "Extra Large"];

  const [showWriteReview, setShowWriteReview] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleShowWriteReview = () => {
    setShowWriteReview(!showWriteReview);
  };

  const scrollRef = useRef(0);

  const location = useLocation();

  const [reviews, setReviews] = useState([]);

  const petAccessory = location.state.petAccessory;
  console.log(petAccessory);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const fetchReviews = async () => {
    await fetchFeedbacks(petAccessory._id)
      .then((data) => {
        setReviews(data);
      })
      .catch((e) => {
        setReviews([]);
      });
  };

  useEffect(() => {
    fetchReviews();
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="flex flex-col items-start justify-start px-10 md:px-36 ">
      <p className="text-lg tracking-wider font-semibold text-zinc-500 mb-5">
        {" "}
        Home / Pets / <span className="text-white"> Accessory </span>
      </p>
      <div className="flex flex-col-reverse lg:flex-row  gap-y-5 items-start gap-x-5 w-full">
        <div className="flex flex-col items-start w-full lg:w-2/3 gap-y-1">
          <p className="text-zinc-500 text-sm"> {petAccessory.brand} </p>
          <p className="text-sm font-semibold tracking-wide">
            {" "}
            {petAccessory.name}
          </p>
          <p className="text-zinc-500 text-sm mb-3">
            {" "}
            Size: {petAccessory.size}
          </p>
          {/* sizes */}
          {/* <div
            id="sizes-section"
            className="flex flex-col items-start w-full mb-5"
          >
            <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-2 w-full">
              {sizes.map((size) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedSize(size);
                    }}
                    className={` ${
                      selectedSize === size ? "bg-red-600" : "bg-zinc-700"
                    }  px-3 py-1 rounded-lg hover:bg-red-600 cursor-pointer transition-all duration-700 ease-out`}
                  >
                    {" "}
                    {size}{" "}
                  </div>
                );
              })}
            </div>
          </div> */}
          <div
            onClick={() => {
              if (!user) {
                navigate("/login");
                toast.success("Plese login to add items to your cart.");
              } else if (user.role !== "user") {
                toast.error("Access denied.");
              } else {
                dispatch(
                  cartSliceActions.addItemToCart({
                    item: {
                      productItem: {
                        id: petAccessory._id,
                        type: petAccessory.producttype,
                        image: petAccessory.image,
                        name: petAccessory.name,
                        price: petAccessory.price,
                      },
                      count: 1,
                      price: petAccessory.price,
                    },
                  })
                );
                toast.success("Item added to cart");
              }
            }}
            className="bg-red-500 text-center rounded-md px-7 py-2 hover:bg-red-700 transition-all duration-700 cursor-pointer w-full md:w-2/3 lg:w-1/3"
          >
            {" "}
            Add to Cart{" "}
          </div>
        </div>
        <div className="flex flex-col items-start w-full md:w-1/3">
          <img
            className="h-48 rounded-lg object-cover w-full"
            src={`http://localhost:3009/uploads/${petAccessory.image}`}
            alt="paws-nepal"
          ></img>
          <p className="mt-2 text-zinc-500 font-semibold tracking-wider">
            {" "}
            Rs. {petAccessory.price}
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
              value={petAccessory.rating}
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
            <p className="text-sm"> {reviews.length} reviews</p>
          </div>
          {/* <div className="w-full flex flex-col gap-y-3">
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
          </div> */}
        </div>
        {/* <div className="flex flex-col w-full items-start">
          <div
            onClick={toggleShowWriteReview}
            className="bg-zinc-800 px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-red-600 font-semibold"
          >
            {" "}
            Write a Review
          </div>
          {showWriteReview && (
            <WriteReview
              id={petAccessory._id}
              showWriteReview={showWriteReview}
              close={toggleShowWriteReview}
            />
          )}
        </div> */}
      </div>

      {/* tabs */}
      <div className="flex flex-row flex-wrap mt-12 gap-x-10 gap-y-5">
        <p
          onClick={() => {
            setSelectedTab("Details");
            scrollToSection("details-section");
          }}
          className={`cursor-pointer ${
            selectedTab === "Details"
              ? "border-b-2 border-b-white text-white"
              : "text-zinc-500 "
          } pb-1 font-semibold hover:text-white`}
        >
          {" "}
          Details
        </p>
        <p
          onClick={() => {
            setSelectedTab("Materials");
            scrollToSection("materials-section");
          }}
          className={`cursor-pointer ${
            selectedTab === "Materials"
              ? "border-b-2 border-b-white text-white"
              : " text-zinc-500"
          } pb-1  font-semibold hover:text-white`}
        >
          {" "}
          Materials
        </p>

        {/* <p
          onClick={() => {
            setSelectedTab("Care Instructions");
            scrollToSection("instructions-section");
          }}
          className={`cursor-pointer ${
            selectedTab === "Care Instructions"
              ? "border-b-2 border-b-white text-white"
              : " text-zinc-500"
          } pb-1  font-semibold hover:text-white`}
        >
          {" "}
          Care Instructions
        </p> */}
        <p
          onClick={() => {
            setSelectedTab("Reviews");
            scrollToSection("reviews-section");
          }}
          className={`cursor-pointer ${
            selectedTab === "Reviews"
              ? "border-b-2 border-b-white text-white"
              : "text-zinc-500"
          } pb-1  font-semibold hover:text-white`}
        >
          {" "}
          Reviews
        </p>
      </div>
      <div style={{ height: "0.5px" }} className="w-full bg-white mb-4"></div>

      {/* details */}
      <div id="details-section" className="flex flex-col items-start w-full">
        <p className="font-semibold tracking-wider mt-6 mb-5"> Details </p>
        <div className="flex flex-row justify-between items-center w-full tracking-wider my-2">
          <p className="text-zinc-500"> Brand </p>
          <p className=""> {petAccessory.brand} </p>
        </div>
        <div className="flex flex-row justify-between items-center  w-full tracking-wider my-2">
          <p className="text-zinc-500"> Type </p>
          <p className=""> {petAccessory.category} </p>
        </div>
        {/* <div className="flex flex-row justify-between items-center  w-full tracking-wider my-2">
          <p className="text-zinc-500"> Category </p>
          <p className=""> Toys </p>
        </div> */}
      </div>

      {/* ingredients */}
      <div id="materials-section" className="flex flex-col items-start w-full">
        <p className="font-semibold tracking-wider mt-6 mb-5"> Materials </p>
        <p className="text-start text-sm"> {petAccessory.materials}</p>
      </div>

      {/* instructions */}
      {/* <div
        id="instructions-section"
        className="flex flex-col items-start w-full"
      >
        <p className="font-semibold tracking-wider mt-6 mb-5">
          {" "}
          Care Instructions{" "}
        </p>
        <p className="text-start text-sm">
          {" "}
          Deboned chicken, chicken meal, brown rice, barley, oatmeal, chicken
          fat (preserved with mixed tocopherols), flaxseed, natural flavor,
          choline chloride, taurine, dried chicory root, Yucca schidigera
          extract, vitamins vitamin E supplement, niacin supplement, thiamine
          mononitrate, d-calcium pantothenate, vitamin A supplement, pyridoxine
          hydrochloride, riboflavin supplement, vitamin D3 supplement, biotin
        </p>
      </div> */}

      {/* reviews */}
      <div id="reviews-section" className="flex flex-col items-start w-full">
        <p className="font-semibold tracking-wider mt-6 mb-5"> Reviews </p>
        {reviews.length === 0 && <p> No reviews found.</p>}
        {reviews.length !== 0 &&
          reviews.map((review) => <ReviewItem review={review}></ReviewItem>)}
      </div>
    </div>
  );
};

export default PetAccessoryDetails;
