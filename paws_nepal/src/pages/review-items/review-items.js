import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postFeedback } from "../../action-creators/feedback-action";
import { useNavigate } from "react-router-dom";

const ReviewItems = () => {
  const [itemsToReview, setItemsToReview] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let items = localStorage.getItem("itemsToReview");
    const theItems = JSON.parse(items);
    setItemsToReview(theItems); 
    console.log(theItems);
  }, []);
  return (
    <div className="flex flex-col items-start justify-start px-10 md:px-36 w-full">
      {itemsToReview.length !== 0 && (
        <div className="w-full">
          {" "}
          {itemsToReview.map((item) => {
            return <WriteReviewItem item={item}></WriteReviewItem>;
          })}
        </div>
      )}
      <div className="flex flex-row gap-x-4 justify-end w-full mt-5">
        <div
          onClick={() => {
            navigate("/home");
            localStorage.removeItem("itemsToReview");
          }}
          className="bg-slate-500 text-center rounded-md px-8 py-2 hover:bg-slate-700 transition-all duration-700 cursor-pointer"
        >
          {" "}
          Skip
        </div>
      </div>
    </div>
  );
};

export default ReviewItems;

const WriteReviewItem = ({ item }) => {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;
  const token = authState.token;

  const postReview = async () => {
    if (!user) {
      toast.error("Login to give feedbacks.");
    } else if (review.length === 0) {
      toast.error("Feedback is empty.");
    } else {
      await postFeedback(item.productItem.id, token, rating, review)
        .then(() => {
          toast.success("Your feedback has been posted.");
        })
        .catch((e) => {
          toast.error(e.message);
        });
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-full mb-5">
      <div
        // onClick={handleNavigation}
        className="flex flex-col items-start md:flex-row md:items-center gap-y-2 cursor-pointer"
      >
        <img
          className="h-20 w-20 rounded-md object-cover mr-4"
          src={`http://localhost:3009/uploads/${item.productItem.image}`}
          alt="paws-nepal"
        ></img>
        <div className="flex flex-col items-start justify-center text-sm tracking-wider gap-y-1">
          <p className="font-semibold"> {item.name}</p>
          <p className="text-zinc-500">
            {" "}
            Rs. {item.productItem.price} ({item.count}x)
          </p>
        </div>
      </div>
      <Rating
        onChange={(event, value) => {
          setRating(value);
        }}
        className="mt-3 mb-5"
        name="simple-controlled"
        value={rating}
        precision={0.5}
        sx={{
          "& .MuiRating-iconFilled": {
            color: "red",
            fontSize: "2.5rem", // Change the filled star color
          },
          "& .MuiRating-iconEmpty": {
            borderColor: "red",
            fontSize: "2.5rem", // Change the border color
          },
          "& .MuiSvgIcon-root": {
            fill: "red",
            fontSize: "2.5rem", // Make the unfilled stars transparent
            //   stroke: "red", // Change the border color of the unfilled stars
          },
        }}
      />
      <textarea
        className=" bg-zinc-700 px-3 py-3 w-full rounded-lg"
        rows={5}
        placeholder="Please leave us a review ..."
        onChange={(event) => {
          setReview(event.target.value);
        }}
      ></textarea>
      <div className="flex flex-row gap-x-4 justify-end w-full mt-5">
        <div
          onClick={postReview}
          className="bg-red-500 text-center rounded-md px-3 py-2 hover:bg-red-700 transition-all duration-700 cursor-pointer"
        >
          {" "}
          Submit
        </div>
      </div>
      <div className="h-0.5 w-full bg-white mt-9"></div>
    </div>
  );
};
