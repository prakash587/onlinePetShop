import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  fetchOrders,
  fetchUserOrders,
} from "../../action-creators/order-action";
import { useSelector } from "react-redux";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;
  const user = authState.user;

  useEffect(() => {
    const fetchTheOrders = async () => {
      if (user.role === "user") {
        await fetchUserOrders(token, user._id)
          .then((data) => {
            setOrders(data);
          })
          .catch((e) => {
            setOrders([]);
          });
      } else {
        await fetchOrders(token)
          .then((data) => {
            setOrders(data);
          })
          .catch((e) => {
            setOrders([]);
          });
      }
    };

    fetchTheOrders();
  }, [token]);

  return (
    <div className="flex flex-col gap-y-4 mx-10 items-start">
      <p className="font-bold text-xl tracking-wider"> Orders </p>
      {orders.length === 0 && <p className="py-32"> You have no orders. </p>}
      {orders.map((order) => {
        return <OrderItem order={order}></OrderItem>;
      })}
    </div>
  );
};

export default Orders;

const OrderItem = ({ order }) => {
  const date = new Date(order.updatedAt);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [showDetails, setShowDetails] = useState(false);
  return (
    <div
      onClick={() => {
        setShowDetails(!showDetails);
      }}
      className="w-full flex flex-row items-start bg-zinc-800 rounded-lg px-4 py-3 gap-x-8 cursor-pointer duration-700 ease-in-out transition-all"
    >
      <FontAwesomeIcon icon={faBook} className="text-xl pt-2"></FontAwesomeIcon>

      <div className="flex flex-col items-start gap-y-1.5">
        <p className="font-semibold tracking-wider"> Order No. {order._id} </p>
        <p className="font-normal tracking-wider pt-3">
          {" "}
          Order Items:{" "}
          <span className="text-red-600">{order.products.length}x</span>{" "}
        </p>
        <p className="font-normal tracking-wider pb-2">
          {" "}
          Price: <span className="text-red-600">
            Rs.{order.totalprice}
          </span>{" "}
        </p>
        <p className="font-normal tracking-wider pb-2">
          {" "}
          Location:{" "}
          <span className="text-red-600">
            {order.houseNumber}, {order.city}, {order.district}
          </span>{" "}
        </p>
        <p className="font-normal tracking-wider pb-2">
          {" "}
          Contact: <span className="text-red-600">
            {order.contactNumber}
          </span>{" "}
        </p>
        {/* <p className="tracking-wider"> {order.message}</p> */}
        {showDetails &&
          order.products.map((product) => (
            <div className="flex flex-row items-center justify-between w-full mb-5">
              <div
                // onClick={handleNavigation}
                className="flex flex-col items-start md:flex-row md:items-center gap-y-2 cursor-pointer"
              >
                <img
                  className="h-20 w-20 rounded-md object-cover mr-4"
                  src={`http://localhost:3009/uploads/${product.productId.image}`}
                  alt="paws-nepal"
                ></img>
                <div className="flex flex-col items-start justify-center text-sm tracking-wider gap-y-1">
                  <p className="font-semibold"> {product.productId.name}</p>
                  <p className="text-zinc-500">
                    {" "}
                    Rs. {product.quantity * product.productId.price} (
                    {product.quantity}x)
                  </p>
                </div>
              </div>
            </div>
          ))}
        {showDetails && user.role === "admin" && <p> {order.userId.name}</p>}
        <p className="text-sm"> {formattedDate}</p>
      </div>
    </div>
  );
};
