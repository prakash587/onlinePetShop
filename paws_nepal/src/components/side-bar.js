import {
  faAdd,
  faBagShopping,
  faBell,
  faBoxOpen,
  faBroadcastTower,
  faHome,
  faPaw,
  faShoppingBasket,
  faSignOut,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../slices/auth-slice";
import { logoutUser } from "../action-creators/auth-action";
import { cartSliceActions } from "../slices/cart-slice";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  return (
    <div
      className={`fixed bg-zinc-800 overflow-y-auto overflow-hidden h-full w-2/3 md:w-1/3  top-0 left-0 transition-transform duration-1000 transform z-10 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col items-start justify-start py-10 gap-y-3 w-full">
        <div className="flex flex-row items-center gap-x-3 mb-8 px-10">
          <FontAwesomeIcon className="text-xl" icon={faPaw}></FontAwesomeIcon>
          <p className="text-xl font-semibold"> Paws Nepal</p>
        </div>
        {user && user.role === "admin" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-red-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            <Link
              to="/inventory/add-inventory"
              className="font-semibold tracking-wider text-lg"
            >
              Inventory
            </Link>
          </div>
        )}
        <div
          onClick={() => {
            toggleSidebar();
          }}
          className="flex flex-row items-center gap-x-6 hover:bg-red-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
        >
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          <Link
            to="/category/All"
            className="font-semibold tracking-wider text-lg"
          >
            Category
          </Link>
        </div>
        {user && user.role !== "admin" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-red-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUserDoctor}></FontAwesomeIcon>
            <Link
              to="/my_appointments"
              className="font-semibold tracking-wider text-lg"
            >
              Appointments
            </Link>
          </div>
        )}
        {user && user.role === "doctor" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-red-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
            <Link
              to="/add-schedule"
              className="font-semibold tracking-wider text-lg"
            >
              Add Schedule
            </Link>
          </div>
        )}
        {user && user.role === "user" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-red-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon>
            <Link
              to="/home/my-cart"
              className="font-semibold tracking-wider text-lg"
            >
              My Cart
            </Link>
          </div>
        )}
        {user && user.role === "admin" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-red-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBroadcastTower}></FontAwesomeIcon>
            <Link
              to="/doctor-applications"
              className="font-semibold tracking-wider text-lg"
            >
              Doctor Applications
            </Link>
          </div>
        )}
        {user && user.role !== "doctor" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-red-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBroadcastTower}></FontAwesomeIcon>
            <Link to="/orders" className="font-semibold tracking-wider text-lg">
              Orders
            </Link>
          </div>
        )}
        {user  && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-red-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
            <Link to="/notifications" className="font-semibold tracking-wider text-lg">
              Notifications
            </Link>
          </div>
        )}
        {user && (
          <div
            onClick={async () => {
              toggleSidebar();
              await logoutUser().then(() => {
                dispatch(
                  authSliceActions.replaceLoggedInState({
                    user: null,
                    token: null,
                  })
                );
                dispatch(cartSliceActions.clearCart());
              });
              navigate("/login");
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-red-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
            <div className="font-semibold tracking-wider text-lg">Log Out</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
