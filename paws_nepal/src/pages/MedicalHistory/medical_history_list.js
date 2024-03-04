// MedicalHistoryList.js
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import MedicalHistoryRecord from "./medical_history_record";
import { addDays, subDays } from "date-fns";

const MedicalHistoryList = () => {
  // Sample medical history data
  const medicalHistory = [
    {
      diseaseName: "Hypertension",
      description:
        "High blood pressure condition. High High blood pressure condition. High blood pressure condition. High blood pressure condition. High blood pressure condition. High blood pressure condition. High blood pressure condition. High blood pressure condition. High blood pressure condition. High blood pressure condition. High blood pressure condition. High blood pressure condition.High blood pressure condition. High blood pressure condition. High blood pressure condition.High blood pressure condition.blood pressure condition.High blood pressure condition.",
      recommendedFoods: ["Fruits", "Vegetables", "Whole Grains"],
      nonRecommendedFoods: ["Processed Foods", "Sugary Drinks"],
    },
    {
      diseaseName: "Diabetes",
      description: "A condition affecting blood sugar levels.",
      recommendedFoods: ["Lean Proteins", "High-fiber Foods", "Nuts"],
      nonRecommendedFoods: ["Sugary Snacks", "White Bread"],
    },
    // Add more medical history records as needed
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const handlePreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  return (
    <div className="pt-24 flex flex-col items-center">
      <div className="w-4/6 flex flex-row justify-start">
        <h1 className="text-2xl text-start font-semibold mb-4 text-black">
          Medical History
        </h1>
      </div>
      <div className="w-4/6 flex flex-row justify-start">
        <div className="my-4">
          <button
            onClick={handlePreviousDay}
            className="bg-gray-300  hover:bg-gray-400 text-gray-600 py-2 px-3 rounded-l-md"
          >
            &#8249;
          </button>
          <ReactDatePicker
            className="text-center text-orange-500 font-semibold text-sm border-none focus:outline-none hover:outline-none"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            showYearDropdown
            scrollableYearDropdown
            todayButton="Today"
            placeholderText="Select a date"
          ></ReactDatePicker>
          <button
            onClick={handleNextDay}
            className="bg-gray-300 hover:bg-gray-400 text-gray-600 py-2 px-3 rounded-r-md"
          >
            &#8250;
          </button>
        </div>
      </div>
      <div className="sm:w-4/6">
        {medicalHistory.map((record, index) => (
          <MedicalHistoryRecord key={index} record={record} />
        ))}
      </div>
    </div>
  );
};

export default MedicalHistoryList;
