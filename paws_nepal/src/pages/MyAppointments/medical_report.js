import { faClose, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MedicalReport = ({ isOpen, report, toggleIsOpen }) => {
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
          report.diagnosis,
          report.description,
          report.recommends.join(", "),
          report.nonrecommendeds.join(", "),
        ],
      ],
      startY: 40,
    });
    doc.save("medical_history.pdf");
  };
  return (
    <div
      className={`z-40 fixed right-0 overflow-y-auto overflow-hidden h-full w-96 bg-zinc-800 top-0 transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {report === null && <div></div>}
      {report !== null && (
        <div className="p-4 text-white relative flex flex-col">
          <div className="fixed bottom-2 right-2 cursor-pointer">
            <p> Paws Nepal</p>
          </div>
          <div
            onClick={handleDownloadPDF}
            className="fixed bottom-2 left-2 cursor-pointer text-lg"
          >
            <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold mb-4">Medical Report</h2>
            <FontAwesomeIcon
              onClick={toggleIsOpen}
              icon={faClose}
              className="cursor-pointer"
            />
          </div>
          <div className="mb-2 flex flex-row justify-between">
            <strong>Date:</strong>
            <p className="text-sm">{report.date.substring(0, 10)}</p>
          </div>
          <div className="h-0.5 w-full bg-white my-2"></div>
          <div className="mb-2 flex flex-row justify-between">
            <strong>Diagnosis:</strong>
            <p>{report.diagnosis}</p>
          </div>
          <div className="mb-2 flex flex-col">
            <strong>Description:</strong>
            <p>{report.description}</p>
          </div>
          <div className="h-0.5 w-full bg-white my-2"></div>
          <div className="mb-4">
            <strong>Recommendations:</strong>
            {report.recommends.length === 0 && (
              <p className=""> No recommendations.</p>
            )}
            {report.recommends.length !== 0 && (
              <ul>
                {report.recommends.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="h-0.5 w-full bg-white my-2"></div>
          <div className="mb-4">
            <strong>Non-recommendations:</strong>
            {report.nonrecommendeds.length === 0 && (
              <p className=""> No recommendations.</p>
            )}
            {report.nonrecommendeds.length !== 0 && (
              <ul>
                {report.nonrecommendeds.map((nonRecommendations, index) => (
                  <li key={index}>{nonRecommendations}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <strong>Patient Name:</strong> {report.patientName}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalReport;
