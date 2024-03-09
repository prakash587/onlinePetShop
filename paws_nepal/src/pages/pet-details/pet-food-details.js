import { Rating } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ReviewItem from "../../components/review-item";
import WriteReview from "../../components/write-review";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "../../slices/cart-slice";
import toast from "react-hot-toast";
import { fetchFeedbacks } from "../../action-creators/feedback-action";

const PetFoodDetails = () => {
  const [selectedTab, setSelectedTab] = useState("Details");

  const [showWriteReview, setShowWriteReview] = useState(false);

  const [reviews, setReviews] = useState([]);

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

  const petFood = location.state.petFood;
  console.log(petFood);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const fetchReviews = async () => {
    await fetchFeedbacks(petFood._id)
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
        Home / Pets / <span className="text-white"> Food </span>
      </p>
      <div className="flex lg:flex-row flex-col-reverse items-start gap-x-5 w-full gap-y-5">
        <div className="flex flex-col items-start w-full lg:w-2/3 gap-y-1">
          <p className="text-zinc-500 text-sm"> {petFood.brand}</p>
          <p className="text-sm font-semibold tracking-wide">{petFood.name}</p>
          <p className="text-red-500 text-sm mb-3"> Rs. {petFood.price}</p>
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
                        id: petFood._id,
                        type: petFood.producttype,
                        image: petFood.image,
                        name: petFood.name,
                        price: petFood.price,
                      },
                      count: 1,
                      price: petFood.price,
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
            src={`http://localhost:3009/uploads/${petFood.image}`}
            alt="paws-nepal"
          ></img>
          <p className="mt-2 text-zinc-500 font-semibold tracking-wider">
            {" "}
            Rs. 250
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
              value={petFood.rating}
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
              id={petFood._id}
              showWriteReview={showWriteReview}
              close={toggleShowWriteReview}
            />
          )}
        </div> */}
      </div>

      {/* tabs */}
      <div className="flex flex-row mt-12 gap-x-10">
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
            setSelectedTab("Ingredients");
            scrollToSection("ingredients-section");
          }}
          className={`cursor-pointer ${
            selectedTab === "Ingredients"
              ? "border-b-2 border-b-white text-white"
              : " text-zinc-500"
          } pb-1  font-semibold hover:text-white`}
        >
          {" "}
          Ingredients
        </p>
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
          <p className=""> {petFood.brand} </p>
        </div>
        <div className="flex flex-row justify-between items-center  w-full tracking-wider my-2">
          <p className="text-zinc-500"> Fat </p>
          <p className=""> {petFood.fat}% </p>
        </div>
        <div className="flex flex-row justify-between items-center  w-full tracking-wider my-2">
          <p className="text-zinc-500"> Fiber </p>
          <p className=""> {petFood.fiber}%</p>
        </div>
        <div className="flex flex-row justify-between items-center  w-full tracking-wider my-2">
          <p className="text-zinc-500"> Protein </p>
          <p className=""> {petFood.protein}%</p>
        </div>
      </div>

      {/* ingredients */}
      <div
        id="ingredients-section"
        className="flex flex-col items-start w-full"
      >
        <p className="font-semibold tracking-wider mt-6 mb-5"> Ingredients </p>
        <p className="text-start text-sm"> {petFood.ingredients}</p>
      </div>

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

export default PetFoodDetails;
