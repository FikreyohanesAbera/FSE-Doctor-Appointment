import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


export const Doctors = (props) => {
  const [doctor, setDoctor] = useState({

  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/doctor/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.doctorData)
        setDoctor(data.doctorData)
      }
      );


  }, [])


  console.log(id)

  // const DoctorProfile = ({ doctor }) => {
  //   const {
  //     name,
  //     ,
  //     image,
  //     description,
  //     specialties,
  //     email,
  //     phone,
  //     address,
  //   } = doctor;

    const handleAppointment = () => {
      // console.log(`Appointment scheduled with ${name}`);
    };

    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h1>hey</h1>
        <div className="px-4 py-2">
          <h1 className="text-gray-800 text-3xl font-semibold">{doctor.name}</h1>
          <p className="mt-1 text-gray-600 text-sm">{}</p>
        </div>
        <div className="px-4 py-2">
          <img src={doctor.image} alt={doctor.name} className="h-40 w-full object-cover" />
        </div>
        <div className="px-4 py-2">
          <p className="text-gray-700">{doctor.description}</p>
        </div>
        <div className="px-4 py-2">
          <h2 className="text-gray-800 text-lg font-semibold mb-2">
            Specialties:
          </h2>
          <ul className="text-gray-700">
            {/* {specialties.map((, i) => (
              <li key={i}>- {}</li>
            ))} */}
          </ul>
        </div>
        <div className="px-4 py-2">
          <h2 className="text-gray-800 text-lg font-semibold mb-2">
            Contact Information:
          </h2>
          <p className="text-gray-700">
            Email: {doctor.email} <br />
            Phone: {doctor.phone} <br />
            Address: {doctor.address}
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Link to={`/Get_appointment/${id}`}  className="p-5">
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

  // const handleDelete = (index) => {
  //   const updatedDoctors = [...doctors];
  //   updatedDoctors.splice(index, 1);
  //   setDoctors(updatedDoctors);
  // };

  // return (
  //   <div className="container mx-auto py-8">
  //     <h1 className="text-3xl font-semibold mb-6">Doctors</h1>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  //       <DoctorProfile
  //         // key={index}
  //         doctor={doctor}
  //         onDelete={() => handleDelete(index)}
  //       />
  //     </div>
  //   </div>
  // );

