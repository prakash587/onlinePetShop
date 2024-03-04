import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/dist";
import toast from "react-hot-toast";

const RatingsAndReviews = () => {
  const [reviews, setReviews] = useState([]);

  const { doctorId } = useParams();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;

  const fetchReviews = async () => {
    try {
      const url = `http://localhost:3009/feedback/${doctorId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        setReviews(jsonData.result);
      } else {
         setReviews([]);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="h-96 w-full bg-zinc-800 pt-5 mt-5 border overflow-y-auto overflow-x-hidden ">
      {reviews.length === 0 && (
        <p className="text-center pt-10 text-white  text-sm font-bold">
          {" "}
          No reviews found!!!
        </p>
      )}
      {reviews.length > 0 && (
        <div>
          {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

const ReviewItem = ({ review }) => (
  <div className="border p-4 mb-4 mx-4 border-solid border-black flex flex-col ">
    <div className="flex flex-row items-center justify-start">
      <img
        src={`http://localhost:3009/assets/${review.userImage}`}
        alt={review.username}
        className="w-12 h-12 rounded-full mr-4 object-cover border border-solid border-black "
      />
      <div className="flex flex-col justify-start">
        <h3 className="font-semibold text-lg">{review.username}</h3>
        <Rating
          name="simple-controlled"
          value={review.rating}
          onChange={() => {}}
        />
      </div>
    </div>
    <p className="mt-3 w-full h-fit">{review.comment}</p>
  </div>
);

export default RatingsAndReviews;