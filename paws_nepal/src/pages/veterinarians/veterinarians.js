import React, { useEffect, useRef, useState } from "react";
import VetItem from "../../components/vet-item";
import {
  fetchDoctorsByName,
  fetchDoctorsList,
} from "../../action-creators/doctor-list-action";
import { useDispatch, useSelector } from "react-redux";
import { doctorsListSliceActions } from "../../slices/doctors_slice";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";

const Veterinarians = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const doctorsListState = useSelector((state) => {
    return state.doctorslist;
  });

  const doctorsList = doctorsListState.doctorsList;

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchByName = async (searchTerm) => {
    setSearchTerm(searchTerm);
    setIsLoading(true);
    await fetchDoctorsByName(searchTerm, user.token)
      .then((data) => {
        if (data === null) {
          dispatch(
            doctorsListSliceActions.replaceDoctorsList({
              list: [],
            })
          );
        } else {
          dispatch(
            doctorsListSliceActions.replaceDoctorsList({
              list: data,
            })
          );
        }
        setIsLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
        setIsLoading(false);
      });
  };

  const handleDoctorSelection = async (speciality) => {
    setIsLoading(true);
    await fetchDoctorsList(speciality)
      .then((data) => {
        if (data === null) {
          dispatch(
            doctorsListSliceActions.replaceDoctorsList({
              list: [],
            })
          );
        } else {
          dispatch(
            doctorsListSliceActions.replaceDoctorsList({
              list: data,
            })
          );
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const scrollRef = useRef(0);

  useEffect(() => {
    const getDoctorApplications = async () => {
      setIsLoading(true);
      await fetchDoctorsList("all")
        .then((data) => {
          if (data === null) {
            dispatch(
              doctorsListSliceActions.replaceDoctorsList({
                list: [],
              })
            );
          } else {
            dispatch(
              doctorsListSliceActions.replaceDoctorsList({
                list: data,
              })
            );
          }
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    };
    getDoctorApplications();
    window.scrollTo(0, scrollRef.current);

    return () => {};
  }, [dispatch]);

  return (
    <div className="flex flex-col items-start justify-start px-10 md:px-36 w-full">
      <p className="text-2xl tracking-wider font-semibold text-white mb-5">
        {" "}
        Veterinarians
      </p>
      <p className="text-zinc-500 font-semibold tracking-wider mb-2">
        {" "}
        Find the right care for your pet
      </p>
      <div className="flex flex-row w-full my-4">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a vet"
          className="w-full p-2 border rounded-l-sm bg-zinc-700"
        ></input>
        <button
          onClick={() => {
            handleSearchByName(searchTerm);
          }}
          className="bg-red-600 text-white p-2 rounded-r-md hover:bg-red-700"
        >
          <FontAwesomeIcon icon={faSearch} className="text-white px-2" />
        </button>
      </div>

      <p className="text-lg tracking-wider font-semibold text-white mb-5">
        {" "}
        Featured Vets
      </p>
      {isLoading && (
        <div className="h-32 flex justify-center items-center w-full">
          <ClipLoader color="white"></ClipLoader>
        </div>
      )}
      {!isLoading && !hasError && doctorsList.length === 0 && (
        <div className="text-center mt-5"> No doctors Available.</div>
      )}

      {!isLoading &&
        !hasError &&
        doctorsList.length !== 0 &&
        doctorsList.map((doctor) => {
          return <VetItem vet={doctor}></VetItem>;
        })}
    </div>
  );
};

export default Veterinarians;
