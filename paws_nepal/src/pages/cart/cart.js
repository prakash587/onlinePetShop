import React, { useEffect, useRef } from "react";
import CartItem from "../../components/cart-item";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(0);

  const cartState = useSelector((state) => {
    return state.cart;
  });

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  let totalPrice = cartState.totalPrice;

  let items = cartState.items;

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  });

  return (
    <div className="flex flex-col items-start justify-start px-10 md:px-36">
      <p className="text-lg tracking-wider font-semibold text-zinc-500 mb-5">
        {" "}
        Home / <span className="text-white"> Cart </span>
      </p>
      <div className="flex flex-col items-start justify-start w-full">
        {items.length === 0 && (
          <div className="flex flex-row justify-center w-full my-10 tracking-widest">
            <p> You have no items in your cart</p>
          </div>
        )}
        {items.length !== 0 &&
          items.map((item) => {
            return (
              <CartItem
                item={item.productItem}
                count={item.count}
                price={item.price}
              ></CartItem>
            );
          })}
      </div>
      <div className="flex flex-row justify-between items-center mt-5 w-full">
        <p className="text-zinc-500"> Subtotal</p>
        <p className="font-semibold"> Rs. {totalPrice} </p>
      </div>
      <div className="flex flex-row justify-between items-center mt-5 mb-6 w-full">
        <p className="text-zinc-500"> Total</p>
        <p className="font-semibold"> Rs. {totalPrice} </p>
      </div>
      <div className="flex flex-col items-start md:flex-row md:justify-end md:items-center mt-5 w-full gap-x-4 gap-y-4">
        <div
          onClick={() => {
            navigate("/category/All");
          }}
          className="bg-zinc-700 font-semibold rounded-lg px-4 py-2 cursor-pointer hover:bg-red-800 transition-all ease-out duration-700"
        >
          {" "}
          Continue Shopping
        </div>

        <button
          disabled={items.length === 0}
          onClick={() => {
            navigate(`/home/${user._id}/my-cart/check-out`);
          }}
          className={`${
            items.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
          } bg-red-600 font-semibold rounded-lg px-4 py-2  hover:bg-red-800 transition-all ease-out duration-700`}
        >
          {" "}
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
