// MedicalHistoryRecord.js
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MedicalHistoryRecord = ({ record }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(17);
    // Add "Medical Report" text
    doc.text("Medical Report", 15, 20);

    // Set the font size and style for the patient's name
    doc.setFontSize(13);

    // Add the patient's name
    doc.text(`Patient Name: Sagar Sunar`, 15, 30);
    doc.autoTable({
      head: [["Disease Name", "Description", "Recommends", "Non-Recommendeds"]],
      body: [
        [
          record.diseaseName,
          record.description,
          record.recommendedFoods.join(", "),
          record.nonRecommendedFoods.join(", "),
        ],
      ],
      startY: 40,
    });
    doc.save("medical_history.pdf");
  };

  return (
    <div className="bg-white lg:p-4 sm:p-2 mb-4 shadow-md shadow-gray-200 rounded-sm">
      <div className="flex  justify-between items-center">
        <div className="flex flex-row items-center ">
          <h2 className="font-semibold pr-3 text-gray-400">Diagnosis: </h2>
          <h2 className="font-semibold">{record.diseaseName}</h2>
        </div>
        <div className="flex sm:ml-2  flex-row items-center">
          <FontAwesomeIcon
            icon={faFileDownload}
            className="sm:hidden lg:flex text-2xl text-blue-400 pr-5 cursor-pointer"
            onClick={handleDownloadPDF}
          ></FontAwesomeIcon>
          <p className="sm:hidden lg:flex pr-3 text-orange-400 font-semibold text-sm ">
            12 | 12 | 2023
          </p>
          <button
            className="text-gray-400 cursor-pointer"
            onClick={toggleExpanded}
          >
            {expanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className={`medical-record ${expanded ? "expanded" : ""}`}>
          <div className="lg:hidden mt-3 flex justify-between">
            <p className="lg:flex pr-3 text-orange-400 font-semibold text-sm ">
              12 | 12 | 2023
            </p>
            <FontAwesomeIcon
              icon={faFileDownload}
              className=" text-2xl text-blue-400 cursor-pointer"
              onClick={handleDownloadPDF}
            ></FontAwesomeIcon>
          </div>
          <div className=" mt-4">
            <p className="font-semibold pr-3 text-gray-400"> Description: </p>
            <p className="text-gray-500 mb-3 text-sm font-semibold">
              {record.description}
            </p>
            <h3 className="font-semibold text-gray-400">Recommends:</h3>
            <ul>
              {record.recommendedFoods.map((recommendation, index) => (
                <li key={index} className="text-sm font-semibold text-gray-600">
                  {index + 1}. {recommendation}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-400">Non-Recommendeds:</h3>
            <ul>
              {record.nonRecommendedFoods.map((recommendation, index) => (
                <li key={index} className="text-sm font-semibold text-gray-600">
                  {index + 1}. {recommendation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryRecord;
