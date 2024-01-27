import React from "react";
import { Link } from "react-router-dom";

export const Patient_pro = () => {
  const patientData = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Patient Profile
          </h2>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            className="w-32 h-32 rounded-full"
          />
          <h3 className="text-xl font-bold">{patientData.fullName}</h3>
          <p>Email: {patientData.email}</p>
          <p>Phone: {patientData.phone}</p>
        </div>
        <div className="flex gap-5">
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Medical Records
            </button>
          </div>
          <Link to="/Privilage_doc">
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Apply for doctor
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
