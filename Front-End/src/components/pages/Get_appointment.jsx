import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Get_appointment = () => {

  const [formData, setFormData] = useState({
    time: '',
    date: '',
    doctorid: 0
  });
  const { id } = useParams();

  const [error, setError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const navigate = useNavigate();

  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      doctorid: id
    });
  };


  // Display the error message to the user
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send form data to the backend on port 3001
    console.log(JSON.stringify(formData))
    let sentData = formData;
    sentData["token"] = document.cookie;
    
    fetch('http://localhost:3001/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sentData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the backend if needed
        console.log(data);
        if (data.customCode === 12) {
          setSubmitStatus('error');


        }
        else{
          navigate('/payment');

          setSubmitStatus("success");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };



  return (
    <div className="container mx-auto bg-cyan-100">
      <h1 className="text-4xl font-bold text-center mb-8">Get Appointment</h1>

      {/* Appointment Form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="fullName"
            name="fullName"
            className="w-full px-4 py-2 rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-semibold mb-2"
          >
            Preferred Date for Appointment
          </label>
          <input
            onChange={handleChange}
            type="date"
            id="date"
            name="date"
            className="w-full px-4 py-2 rounded-md border-gray-300"
            min={formattedDate}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-gray-700 font-semibold mb-2"
          >
            Time
          </label>
          <input
            onChange={handleChange}
            type="time"
            id="time"
            name="time"
            className="w-full px-4 py-2 rounded-md border-gray-300"
            required
          />
        </div>



        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Book Appointment
        </button>
      </form>
      {submitStatus === 'success' && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          Form submitted successfully!
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          Booking failed. Please try again.
        </div>
      )}

    </div>
  );
};
