import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Patient_pro = () => {
  const [info, setInfo] = useState({});
  const [reached, setReached] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8000/patient", {
      method: 'GET',
      credentials: "include"
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        setInfo(response);
        setReached(true);
      })
  }, [])

  return (
    <div>
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
            <h3 className="text-xl font-bold">{info.fullName}</h3>
            <p>Email: {info.email}</p>
            <p>Phone: {info.phone}</p>
          </div>
          <div className="flex gap-5">
            <Link to="/medicalhistory">
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  View Medical Records
                </button>

              </div>
            </Link>

            <Link to="/Privilage_doc">
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Apply for doctor
                </button>
              </div>
            </Link>
            
            <Link to="/visithistory">
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  See visit History
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {(reached) ?
        <div className="App"> <h2>Checkup Recommendations</h2><span> {info.checkup.docName}  </span><h3> {info.checkup.data.description}  </h3><h3> {info.checkup.data.date}  </h3></div> : null}

    </div>

  );
};
