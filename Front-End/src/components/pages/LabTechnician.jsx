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
        const token= document.cookie;
        fetch(`http://localhost:3001/users/profile`, {
          method: 'GET',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          // Handle the fetched data
          console.log(data);
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
    , []); // Empty dependency array to run the effect only once when the component mounts

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
        </div><div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Medical Records
            </button>
          </div>
        
      </div>
    </div>
  );
};
