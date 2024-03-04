import React, { useState } from "react";
import {
  faAdd,
  faBars,
  faBell,
  faBook,
  faCalendar,
  faPaw,
  faRightToBracket,
  faSearch,
  faShoppingCart,
  faSignOut,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Sidebar from "./side-bar";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInState, logoutUser } from "../action-creators/auth-action";
import { authSliceActions } from "../slices/auth-slice";
import { cartSliceActions } from "../slices/cart-slice";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Corrected the toggle logic
  };

  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const navigate = useNavigate();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const cartState = useSelector((state) => {
    return state.cart;
  });

  let totalCount = cartState.totalItemCount;

  return (
    <div className="bg-zinc-900 flex flex-row w-full justify-between items-center px-5 py-5 border-b-2 border-b-white sticky top-0 z-20">
      <Sidebar isOpen={showMenu} toggleSidebar={toggleMenu}></Sidebar>
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex flex-row items-center gap-x-3 cursor-pointer"
      >
        <FontAwesomeIcon className="text-xl" icon={faPaw}></FontAwesomeIcon>
        <p className="text-lg font-semibold"> Paws Nepal</p>
      </div>
      <div className="flex md:hidden mt-1.5 pr-4 ">
        <FontAwesomeIcon
          icon={faBars}
          className="text-2xl cursor-pointer transition-transform duration-500 ease-in-out"
          style={{
            transform: showMenu ? "rotate(90deg) " : "rotate(0deg)",
          }}
          onClick={toggleMenu}
        />
      </div>
      {showMenu && (
        <div
          onClick={toggleMenu}
          className="fixed h-full w-full bg-black opacity-30 top-0 left-0"
        ></div>
      )}

      <div className="hidden md:flex flex-row items-center gap-x-3">
        {user && user.role === "admin" && (
          <div
            onClick={() => {
              navigate(`/inventories/All`);
            }}
            className="flex flex-row items-center gap-x-4 bg-blue-700 rounded-lg px-3 py-2 text-sm hover:bg-blue-800 transition-all ease-out duration-700 cursor-pointer"
          >
            <p className="tracking-wider font-semibold">View Inventory</p>
          </div>
        )}
        {user && user.role === "admin" && (
          <div
            onClick={() => {
              navigate("/inventory/add-inventory");
            }}
            className="flex flex-row items-center gap-x-4 bg-red-700 rounded-lg px-3 py-2 text-sm hover:bg-red-800 transition-all ease-out duration-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
            <p className="tracking-wider mr-3 font-semibold">Add Inventory</p>
          </div>
        )}
        <div
          onClick={() => {
            navigate("/category/All");
          }}
          className="bg-zinc-700 hover:bg-red-600 px-3 py-2 cursor-pointer hover:text-white-600 rounded-lg flex flex-row items-center justify-center gap-x-4 transition-all duration-700"
        >
          <p className="font-semibold text-sm"> Categories </p>
        </div>
        {user && user.role !== "admin" && (
          <div
            onClick={() => {
              navigate("/my_appointments");
            }}
            className="bg-zinc-700 hover:bg-red-600 px-3 py-2 cursor-pointer hover:text-white-600 rounded-lg flex flex-row items-center justify-center gap-x-4 transition-all duration-700"
          >
            <p className="font-semibold text-sm"> My Appointments </p>
          </div>
        )}
        {user && user.role === "doctor" && (
          <div
            onClick={() => {
              navigate("/add-schedule");
            }}
            className=" cursor-pointer bg-red-600 px-5 py-2 rounded-lg flex flex-row items-center justify-center gap-x-4"
          >
            <FontAwesomeIcon className="text-sm" icon={faAdd}></FontAwesomeIcon>
            <p className="font-semibold text-sm"> Add Schedule </p>
          </div>
        )}
        {user && user.role === "user" && (
          <div
            onClick={() => {
              navigate("/home/my-cart");
            }}
            className=" cursor-pointer bg-red-600 px-5 py-2 rounded-lg flex flex-row items-center justify-center gap-x-4"
          >
            <FontAwesomeIcon
              className="text-sm"
              icon={faShoppingCart}
            ></FontAwesomeIcon>
            <p className="font-semibold text-sm"> Cart ( {totalCount} ) </p>
          </div>
        )}
        {user && user.role === "admin" && (
          <div
            onClick={() => {
              navigate("/doctor-applications");
            }}
            className="bg-zinc-700 rounded-lg px-3 py-2 text-sm hover:bg-zinc-800 transition-all ease-out duration-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUserDoctor}></FontAwesomeIcon>
          </div>
        )}
        {user && user.role !== "doctor" && (
          <div
            onClick={() => {
              navigate("/orders");
            }}
            className="bg-zinc-700 rounded-lg px-3 py-2 text-sm hover:bg-zinc-800 transition-all ease-out duration-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
          </div>
        )}

        {user && (
          <div
            onClick={() => {
              navigate("/notifications");
            }}
            className="bg-zinc-700 rounded-lg px-3 py-2 text-sm hover:bg-zinc-800 transition-all ease-out duration-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
          </div>
        )}
        {user !== null && (
          <div className="relative flex justify-center">
            <img
              src={`http://localhost:3009/uploads/${user.image}`}
              alt={user.name}
              className="flex z-20 h-9 w-9 rounded-lg object-cover border border-gray-400 cursor-pointer justify-end"
              onClick={toggleOptions}
            />
            {showOptions && (
              <div
                className={`absolute transition-all md:w-28 sm:w-24 sm:mt-10  lg:mt-10 md:mt-10 md:right-2 bg-white rounded-md  shadow-lg text-left  ${
                  showOptions ? "max-h-screen" : "max-h-0"
                } ${showOptions ? "opacity-100" : "opacity-10"}`}
              >
                <div className="flex flex-row bg-zinc-600 justify-center items-center hover:bg-red-600 cursor-pointer">
                  <div
                    onClick={async () => {
                      toggleOptions();
                      await logoutUser().then(() => {
                        navigate("/login");
                        dispatch(
                          authSliceActions.replaceLoggedInState({
                            user: null,
                            token: null,
                          })
                        );
                        dispatch(cartSliceActions.clearCart());
                      });
                    }}
                    className="p-2  rounded-b-lg  z-20 text-sm "
                  >
                    Sign Out
                  </div>
                  <FontAwesomeIcon
                    className="text-white text-sm "
                    icon={faSignOut}
                  ></FontAwesomeIcon>
                </div>

                {/* </ul> */}
              </div>
            )}
            {showOptions && (
              <div
                onClick={toggleOptions}
                className="bg-white bg-opacity-10 fixed h-full w-full top-0 left-0 -z-10"
              ></div>
            )}
          </div>
        )}
        {!user && (
          <div className="flex flex-row sm:gap-x-1 md:gap-x-3">
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="flex flex-row cursor-pointer items-center rounded-md bg-zinc-700 hover:bg-black bg-transparent text-black-400 py-2 px-4 hover:text-white transition-all duration-300  ease-in-out"
            >
              <FontAwesomeIcon
                className="pr-3 text-sm"
                icon={faUser}
              ></FontAwesomeIcon>
              <p className="text-sm tracking-wider">Login</p>
            </div>

            <div
              onClick={() => {
                navigate("/register");
              }}
              className="flex flex-row cursor-pointer items-center border-2 border-solid border-red-600 rounded-md hover:bg-red-600 bg-transparent text-red-600 py-2 px-4   hover:text-white transition-all duration-300  ease-in-out"
            >
              <FontAwesomeIcon
                className="pr-3 text-sm"
                icon={faRightToBracket}
              ></FontAwesomeIcon>
              <p className="text-sm tracking-wider">Sign Up</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
