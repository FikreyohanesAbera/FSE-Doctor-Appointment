import React from "react";
import {  useState } from "react";
import { useNavigate} from "react-router-dom";

export const Privilage_doc = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
   const token =  document.cookie;
    const application = {
      token,
      email,
      password,
      privilege: role,
      specialization,
      startTime,
      endTime,
      department,
      phone,
    }
    
    fetch('http://localhost:3001/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(application)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong with the sign-up request');
      } else {
        alert("Your application has been submitted!")
      }

      return response.json();
    }).then(data => {
       navigate("/Patient_pro");
    })
    .catch(error => {
      console.error('Error during sign-up:', error);
    });
    // Add form submission logic here
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setSpecialization("");
    setDepartment("");
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
      }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-4 mb-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-800">
              Apply For Work
            </h2>

            <p className="mt-2 text-center text-sm text-gray-600">
              Are you a doctor or a lab technician?<br></br> Apply for an
              account.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="role" className="block mb-2">
                Role
              </label>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="role"
                    id="doctor"
                    value="doctor"
                    checked={role === "doctor"}
                    onChange={handleRoleChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor="doctor" className="ml-2">
                    Doctor
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    id="labtechnician"
                    value="labtechnician"
                    checked={role === "labtechnician"}
                    onChange={handleRoleChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor="labtechnician" className="ml-2">
                    Lab Technician
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your phone number"
                onChange={(event) => setPhone(event.target.value)}

              />
            </div>


            {role === "doctor" && (
              <div>
                <div className="mb-4">
                  <label htmlFor="specialization" className="block mb-2">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    id="specialization"
                    value={specialization}
                    onChange={handleSpecializationChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="start" className="block mb-2">
                    Start time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    id="start"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endTime" className="block mb-2">
                    End time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    id="endTime"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
            {role === "labtechnician" && (
              <div className="mb-4">
                <label htmlFor="department" className="block mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={department}
                  onChange={handleDepartmentChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-"
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-600">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-500">
              Privacy Statement
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
