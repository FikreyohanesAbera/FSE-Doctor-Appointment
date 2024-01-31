import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const LabTechnician = () => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const token = document.cookie;
    fetch(`http://localhost:3001/users/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the fetched data
        setEmail(data.email)
        setFirstname(data.firstName)
        setPhone(data.phone)
        // patientData = data
      })
      .catch((error) => {
        // Handle any errors that occur
        console.error('Error:', error);
      });
  }
    , []);
  const [patientEmail, setPatientEmail] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [file, setFile] = useState(null);
  const formData = new FormData();
  formData.append('file', file); 
  formData.append('patientEmail', patientEmail);
  formData.append('doctorName', doctorEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    let sentData = formData;
    console.log(sentData)
    console.log("ggggggggggggg")


    fetch("http://localhost:3001/labtest", {
      method: 'POST',
      credentials: "include",
      body: sentData
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
      })

    console.log('Patient Email:', patientEmail);
    console.log('Doctor Email:', doctorEmail);
    console.log('File:', file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Lab Technician Profile
          </h2>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            className="w-32 h-32 rounded-full"
          />
          <h3 className="text-xl font-bold">{firstName}</h3>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
        </div>
        <div className="max-w-md mx-auto mt-8">
          <form encType="multipart/form-data" className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>

            {/* Patient Name */}
            <div className="mb-4">
              <label htmlFor="patientName" className="block text-gray-700 text-sm font-bold mb-2">
                Patient Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter patient email"
                required
              />
            </div>

            {/* Doctor Name */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Doctor Email
              </label>
              <input
                type="text"
                id="docEmail"
                name="doctor"
                value={doctorEmail}
                onChange={(e) => setDoctorEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter doctor email"
                required
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                Upload File
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                accept=".pdf, .doc, .docx"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
