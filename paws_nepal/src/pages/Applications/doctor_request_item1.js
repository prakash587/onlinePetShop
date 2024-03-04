import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import toast from "react-hot-toast";

const DoctorRequestItem1 = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleSetDoctorData = () => {
    props.toggleSidebar();
    props.setDoctorData(props.data);
  };

  const authState = useSelector((state) => {
    return state.auth;
  });
  const token = authState.token;

  const deleteUser = async () => {
    const url = `http://localhost:3009/admin/deleteDoctor/${props.data._id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        toast.success(jsonData.message);
        props.setNewDoctors(props.data._id);
      } else {
        toast.error(jsonData.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        onClick={handleSetDoctorData}
        className="flex flex-row justify-between items-center bg-gray-100 cursor-pointer hover:bg-gray-200 shadow-sm px-2 py-3 mb-2 rounded-md"
      >
        {windowWidth >= 800 && (
          <div className="w-1/4 flex flex-row justify-start">
            {" "}
            {props.data.email}
          </div>
        )}
        <div className="flex flex-row items-center font-bold w-1/4 px-2 justify-center">
          {props.data.name}
        </div>
        <div className="w-1/4 flex flex-row justify-center">
          {" "}
          {props.data.specialization}
        </div>
        {windowWidth >= 800 && (
          <div className="w-1/4 flex flex-row justify-center">
            {" "}
            {props.data.rating}
          </div>
        )}

        {/* //   <div className="w-1/4 flex justify-center">
          //     <div */}
        {/* //       onClick={() => {}}
          //       className=" justify-center w-28 border border-solid border-red-600 transition-all cursor-pointer duration-200  ease-in-out border-spacing-2 flex flex-row gap-x-3 text-red-600 items-center py-1 rounded-sm px-2 hover:bg-red-600 hover:text-white"
          //     >
          //       <p className="text-sm">Delete</p>

          //       <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          //     </div>
          //   </div> */}
        <div className="flex flex-row items-center font-bold w-1/4 px-2 justify-center">
          <DeleteDoctorAlertDialog
            doctorId={props.data._id}
            deleteUser={deleteUser}
          ></DeleteDoctorAlertDialog>
        </div>
      </div>
    </div>
  );
};

export default DoctorRequestItem1;

const DeleteDoctorAlertDialog = ({ doctorId, deleteUser }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className={`  text-red-700 px-5 border-rounded border-solid border-2 border-red-700 py-1.5 cursor-pointer hover:bg-red-700 transition-all hover:text-white`}
        >
          Delete
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            This action cannot be undone. Do you really want to delete the
            doctor ?
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-mauve11 bg-gray-400 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={deleteUser}
                className="text-red11 bg-red-400 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
              >
                Yes, Delete Doctor
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
