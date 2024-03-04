import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartSliceActions } from "../slices/cart-slice";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { deleteProduct } from "../action-creators/inventory-action";
import { inventorySliceActions } from "../slices/inventory-slice";

const DeleteIcon = ({ id, type }) => {
  const dispatch = useDispatch();
  return (
    <FontAwesomeIcon
      onClick={async (e) => {
        e.stopPropagation();
        await deleteProduct(id)
          .then(() => {
            if (type === "Pet") {
              dispatch(inventorySliceActions.deletePet({ id: id }));
            } else if (type === "Petfood") {
              dispatch(inventorySliceActions.deletePetFood({ id: id }));
            } else {
              dispatch(inventorySliceActions.deletePetAccessory({ id: id }));
            }
            toast.success("Product deleted");
          })
          .catch((e) => {
            toast.error("Product deletion failed.");
          });
      }}
      icon={faDeleteLeft}
      className="p-2 text-red-600 absolute top-2 right-2"
    ></FontAwesomeIcon>
  );
};

const AddToCartButton = ({ id, type, image, name, price }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent div

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
              id: id,
              type: type,
              image: image,
              name: name,
              price: price,
            },
            count: 1,
            price: price,
          },
        })
      );
      toast.success("Item added to cart");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-2 right-2 flex text-sm font-normal py-2 px-7 border-2 bg-opacity-85 bg-black border-white text-white transition-all duration-300 rounded-lg ease-in-out hover:decoration-solid hover:font-semibold hover:text-red-700  hover:border-red-700"
    >
      Add to Cart
    </button>
  );
};

const PetItem = ({ pet, id, type, image, name, price, breed }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate("/home/pets/fido", { state: { pet: pet } });
      }}
      className="flex flex-col items-start justify-start gap-y-3 w-full cursor-pointer relative"
    >
      <div className="relative h-64 md:h-56 lg:h-52 w-full flex">
        <img
          src={`http://localhost:3009/uploads/${image}`}
          alt="paws-nepal"
          className="h-64 md:h-56 lg:h-52 object-cover rounded-xl w-full"
        ></img>
        {isHovered && (
          <div className="absolute top-0 left-0 h-64 md:h-56 lg:h-52 rounded-xl w-full bg-black bg-opacity-40 transition-all ease-out duration-500"></div>
        )}
        {isHovered && (
          <AddToCartButton
            id={id}
            type={type}
            image={image}
            name={name}
            price={price}
          ></AddToCartButton>
        )}
        {isHovered && user && user.role === "admin" && (
          <DeleteIcon id={id} type={type}></DeleteIcon>
        )}
      </div>
      <div className="flex flex-col items-start">
        <p className="font-semibold text-lg"> {name} </p>
        <p className="text-gray-600"> {breed} </p>
      </div>
    </div>
  );
};

export default PetItem;

export const PetFoodItem = ({
  petFood,
  id,
  type,
  image,
  name,
  price,
  brand,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate("/home/pets/foods/chicken", { state: { petFood: petFood } });
      }}
      className="flex flex-col items-start justify-start gap-y-3 w-full cursor-pointer"
    >
      <div className="relative h-64 md:h-56 lg:h-52 w-full flex">
        <img
          src={`http://localhost:3009/uploads/${image}`}
          alt="paws-nepal"
          className="h-64 md:h-56 lg:h-52 object-cover rounded-xl w-full"
        ></img>
        {isHovered && (
          <div className="absolute top-0 left-0 h-64 md:h-56 lg:h-52 rounded-xl w-full bg-black bg-opacity-40 transition-all ease-out duration-500"></div>
        )}
        {isHovered && (
          <AddToCartButton
            id={id}
            type={type}
            image={image}
            name={name}
            price={price}
          ></AddToCartButton>
        )}
        {isHovered && user && user.role === "admin" && (
          <DeleteIcon id={id} type={type}></DeleteIcon>
        )}
      </div>
      <div className="flex flex-col items-start">
        <p className="font-semibold text-lg"> {name} </p>
        <p className="text-gray-600"> {brand} </p>
      </div>
    </div>
  );
};

export const PetAccessoryItem = ({
  petAccessory,
  id,
  type,
  image,
  name,
  price,
  brand,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate("/home/pets/accessories/chew-toy", {
          state: { petAccessory: petAccessory },
        });
      }}
      className="flex flex-col items-start justify-start gap-y-3 w-full cursor-pointer"
    >
      <div className="relative h-64 md:h-56 lg:h-52 w-full flex">
        <img
          src={`http://localhost:3009/uploads/${image}`}
          alt="paws-nepal"
          className="h-64 md:h-56 lg:h-52 object-cover rounded-xl w-full "
        ></img>
        {isHovered && (
          <div className="absolute top-0 left-0 h-64 md:h-56 lg:h-52 rounded-xl w-full bg-black bg-opacity-40 transition-all ease-out duration-500"></div>
        )}
        {isHovered && (
          <AddToCartButton
            id={id}
            type={type}
            image={image}
            name={name}
            price={price}
          ></AddToCartButton>
        )}
        {isHovered && user && user.role === "admin" && (
          <DeleteIcon id={id} type={type}></DeleteIcon>
        )}
      </div>
      <div className="flex flex-col items-start">
        <p className="font-semibold text-lg"> {name} </p>
        <p className="text-gray-600"> {brand} </p>
      </div>
    </div>
  );
};
