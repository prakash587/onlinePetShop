import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchNotifications } from "../../action-creators/notification-action";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const token = authState.token;
  const user = authState.user;

  useEffect(() => {
    const fetchTheNotifications = async () => {
      await fetchNotifications(user._id, token)
        .then((data) => {
          setNotifications(data);
        })
        .catch((e) => {
          setNotifications([]);
        });
    };

    fetchTheNotifications();
  }, [token, user._id]);
  return (
    <div className="flex flex-col gap-y-4 mx-10 items-start">
      <p className="font-bold text-xl tracking-wider"> Notifications </p>
      {notifications.length === 0 && <p className="py-36"> You have no notifications. </p>}
      {notifications.length !== 0 &&
        notifications.map((notification) => {
          return (
            <NotificationItem notification={notification}></NotificationItem>
          );
        })}
    </div>
  );
};

export default Notifications;

const NotificationItem = ({ notification }) => {
  return (
    <div className="w-full flex flex-row items-center bg-zinc-800 rounded-lg px-4 py-3 gap-x-8 cursor-pointer hover:bg-red-500 duration-700 ease-in-out transition-all">
      <FontAwesomeIcon icon={faBell} className="text-xl"></FontAwesomeIcon>

      <div className="flex flex-col items-start gap-y-1.5">
        <p className="font-semibold tracking-wider"> {notification.title} </p>
        <p className="tracking-wider"> {notification.message}</p>
        <p className="text-sm"> {notification.time}</p>
      </div>
    </div>
  );
};
