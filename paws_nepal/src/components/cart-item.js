import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { cartSliceActions } from "../slices/cart-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item, count, price }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleNavigation = () => {
  //   switch (item.type) {
  //     case "pet":
  //       navigate(`/home/pets/${item.id}`);
  //       break;
  //     case "petfood":
  //       navigate(`/home/pets/foods/${item.id}`);
  //       break;
  //     case "accessories":
  //       navigate(`/home/pets/accessories/${item.id}`);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <div className="flex flex-row items-center justify-between w-full mb-5">
      <div
        // onClick={handleNavigation}
        className="flex flex-col items-start md:flex-row md:items-center gap-y-2 cursor-pointer"
      >
        <img
          className="h-20 w-20 rounded-md object-cover mr-4"
          src={`http://localhost:3009/uploads/${item.image}`}
          alt="paws-nepal"
        ></img>
        <div className="flex flex-col items-start justify-center text-sm tracking-wider gap-y-1">
          <p className="font-semibold"> {item.name}</p>
          <p className="text-zinc-500">
            {" "}
            Rs. {price} ({count}x)
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-4">
        <div
          onClick={() => {
            dispatch(
              cartSliceActions.removeItemFromCart({
                item: {
                  productItem: item,
                  count: 1,
                  price: item.price,
                },
              })
            );
          }}
          className="cursor-pointer bg-zinc-700 h-8 w-8 rounded-full text-center flex flex-row justify-center items-center"
        >
          <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
        </div>
        <p className="font-semibold"> {count} </p>
        <div
          onClick={() => {
            if (item.type === "Pet") {
              return;
            } else {
              dispatch(
                cartSliceActions.addItemToCart({
                  item: {
                    productItem: item,
                    count: 1,
                    price: item.price,
                  },
                })
              );
            }
          }}
          className="cursor-pointer bg-zinc-700 h-8 w-8 rounded-full text-center flex flex-row justify-center items-center"
        >
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
