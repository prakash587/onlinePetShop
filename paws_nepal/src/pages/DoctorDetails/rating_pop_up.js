// RatingPopup.js
import React, { useState } from "react";
// import "../../css/rating_popup.css";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const RatingPopup = ({ doctorId, isPopupVisible, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;

  const handlePostRating = async () => {
    const url = `http://localhost:3009/feedback/${doctorId}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment,
        }),
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        toast.success(jsonData.message);
        onClose();
      } else {
        toast.error(jsonData.message);
        onClose();
      }
    } catch (e) {
      toast.error(e.message);
      onClose();
    }
  };

  return (
    <div
      className={`fixed z-30 top-1/2 left-1/2 ease-in-out transform transition-transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-md ${
        isPopupVisible ? "opacity-100" : "opacity-20"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">Rate Us</h2>
      <label className="block mb-2" htmlFor="rating">
        Rating:
      </label>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, value) => {
          setRating(value);
        }}
      />
      <label className="block mb-2" htmlFor="comment">
        Comment:
      </label>
      <textarea
        id="comment"
        rows="4"
        cols="25"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      ></textarea>
      <button
        onClick={() => {
          handlePostRating();
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
};

export default RatingPopup;
