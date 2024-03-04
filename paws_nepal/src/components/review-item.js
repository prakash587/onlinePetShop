import React from "react";
import { Rating } from "@mui/material";

const ReviewItem = ({ review }) => {
  return (
    <div className="flex flex-col items-start mb-4 w-full">
      <p className="font-semibold"> {review.userId.name} </p>
      {/* <p className="text-sm text-zinc-500 mb-1.5"> Jul 9, 2023</p> */}
      <Rating
        className="mb-2"
        name="simple-controlled"
        value={review.rating}
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
      <p className="text-start tracking-wider">{review.comment}</p>
      <div style={{ height: "0.5px" }} className="w-full bg-white mt-4"></div>
    </div>
  );
};

export default ReviewItem;
