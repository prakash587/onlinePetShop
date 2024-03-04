import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/category/category-page";
import Header from "./components/header";
import PetDetailsPage from "./pages/pet-details/pet-details";
import PetFoodDetails from "./pages/pet-details/pet-food-details";
import CartPage from "./pages/cart/cart";
import AddInventory from "./pages/add-inventory/add-inventory";
import CheckOut from "./pages/check-out/check-out";
import PetAccessoryDetails from "./pages/pet-details/pet-accessory-details";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import { getLoggedInState } from "./action-creators/auth-action";
import { useDispatch, useSelector } from "react-redux";
import Search from "./pages/search/search";
import Veterinarians from "./pages/veterinarians/veterinarians";
import VeterinarianDetails from "./pages/veterinarians/veterinarian-details";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/not-found/not-found";
import Footer from "./components/footer";
import BecomeADoctor from "./pages/become-vet.js/apply-for-vet";
import DoctorApplications from "./pages/Applications/doctor-applications";
import AddSchedule from "./pages/MyAppointments/add_schedule_page";
import MainPage from "./pages/home/home";
import DoctorDetailsPage from "./pages/DoctorDetails/doctor_Details_page";
import AppointmentDates from "./pages/DoctorDetails/appointment_dates";
import RatingsAndReviews from "./pages/DoctorDetails/ratings_reviews";
import MyAppointments from "./pages/MyAppointments/my_appointments";
import DoctorForm from "./pages/MedicalHistory/post_checkup_form";
import Notifications from "./pages/notifications/notifications";
import Orders from "./pages/orders/orders";
import Inventories from "./pages/add-inventory/inventories";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInState());
  }, [dispatch]);

  const authState = useSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  return (
    <div className="App text-white">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },

          error: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Header></Header>
      <div className="py-4 md:py-12 w-full">
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
          {user && <Route exact path="/orders" element={<Orders />}></Route>}
          <Route
            exact
            path="/"
            element={<Navigate replace to="/home" />}
          ></Route>
          <Route exact path="/home" element={<MainPage />}></Route>
          <Route exact path="/category/:category" element={<Home />}></Route>
          <Route exact path="/find-doctors" element={<Veterinarians />}></Route>
          <Route
            path="/doctor-details/:doctorId"
            element={<DoctorDetailsPage />}
          >
            <Route
              path="/doctor-details/:doctorId/appointmentdates"
              element={<AppointmentDates />}
            ></Route>
            <Route
              path="/doctor-details/:doctorId/ratings&reviews"
              element={<RatingsAndReviews />}
            ></Route>
          </Route>
          <Route
            exact
            path="/veterinarians/Emily"
            element={<VeterinarianDetails />}
          ></Route>
          <Route exact path="/home/my-cart" element={<CartPage />}></Route>
          <Route
            exact
            path="/home/pets/fido"
            element={<PetDetailsPage />}
          ></Route>
          <Route
            exact
            path="/home/pets/foods/chicken"
            element={<PetFoodDetails />}
          ></Route>
          <Route
            exact
            path="/home/pets/accessories/chew-toy"
            element={<PetAccessoryDetails />}
          ></Route>
          {user && user.role !== "admin" && (
            <Route
              exact
              path="/my_appointments"
              element={<MyAppointments />}
            ></Route>
          )}
          {user && user.role === "admin" && (
            <Route
              exact
              path="/inventories/:category"
              element={<Inventories />}
            ></Route>
          )}
          {user && user.role === "admin" && (
            <Route
              exact
              path="/inventory/add-inventory"
              element={<AddInventory />}
            ></Route>
          )}
          {user && user.role !== "admin" && user.role !== "doctor" && (
            <Route
              exact
              path="/:userId/apply-for-vet"
              element={<BecomeADoctor></BecomeADoctor>}
            ></Route>
          )}
          {user && user.role === "admin" && (
            <Route
              exact
              path="/doctor-applications"
              element={<DoctorApplications />}
            ></Route>
          )}
          {user && (
            <Route
              exact
              path="/home/:userId/my-cart/check-out"
              element={<CheckOut />}
            ></Route>
          )}
          {user && user.role === "doctor" && (
            <Route
              path="/add-schedule"
              element={<AddSchedule></AddSchedule>}
            ></Route>
          )}
          {user && (
            <Route
              path="/notifications"
              element={<Notifications></Notifications>}
            ></Route>
          )}
          {user && user.role === "doctor" && (
            <Route
              exact
              path="/my_appointments/:appointmentId/post_checkup_form"
              element={<DoctorForm />}
            ></Route>
          )}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;

// px-10 md:px-36
