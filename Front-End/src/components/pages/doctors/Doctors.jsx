import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Doctors = () => {
  const [doctors, setDoctors] = useState([
    {
      name: "Dr. John Doe",
      specialty: "Pediatrician",
      image: "https://via.placeholder.com/150",
      description:
        "Dr. John Doe specializes in pediatric care and has a passion for helping children lead healthier lives.",
      specialties: ["Pediatric Care", "Child Development", "Immunizations"],
      email: "john.doe@example.com",
      phone: "+1 234 567 8901",
      address: "456 Elm Street, City, Country",
    },
    // Add more sample doctors here...
  ]);

  const DoctorProfile = ({ doctor }) => {
    const {
      name,
      specialty,
      image,
      description,
      specialties,
      email,
      phone,
      address,
    } = doctor;

    const handleAppointment = () => {
      console.log(`Appointment scheduled with ${name}`);
    };

    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-2">
          <h1 className="text-gray-800 text-3xl font-semibold">{name}</h1>
          <p className="mt-1 text-gray-600 text-sm">{specialty}</p>
        </div>
        <div className="px-4 py-2">
          <img src={image} alt={name} className="h-40 w-full object-cover" />
        </div>
        <div className="px-4 py-2">
          <p className="text-gray-700">{description}</p>
        </div>
        <div className="px-4 py-2">
          <h2 className="text-gray-800 text-lg font-semibold mb-2">
            Specialties:
          </h2>
          <ul className="text-gray-700">
            {specialties.map((specialty, i) => (
              <li key={i}>- {specialty}</li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-2">
          <h2 className="text-gray-800 text-lg font-semibold mb-2">
            Contact Information:
          </h2>
          <p className="text-gray-700">
            Email: {email} <br />
            Phone: {phone} <br />
            Address: {address}
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Link to="/Get_appointment " className="p-5">
            <button
              onClick={handleAppointment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Appointment
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const handleDelete = (index) => {
    const updatedDoctors = [...doctors];
    updatedDoctors.splice(index, 1);
    setDoctors(updatedDoctors);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <DoctorProfile
            key={index}
            doctor={doctor}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};
