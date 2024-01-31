import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


export const Doctors = (props) => {
  const [doctor, setDoctor] = useState({

  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/doctor/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.doctorData)
        setDoctor(data.doctorData)
      }
      );


  }, [])

    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* <h1>hey</h1> */}
        <div className="px-4 py-2">
          <h1 className="text-gray-800 text-3xl font-semibold">{doctor.firstName}</h1>
          <p className="mt-1 text-gray-600 text-sm">{}</p>
        </div>
        <div className="px-4 py-2">
          <img src={"data:image/jpeg;base64,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"} alt={doctor.name} className="h-40 w-full object-cover" />
        </div>
        <div className="px-4 py-2">
          <p className="text-gray-700">{doctor.description}</p>
        </div>
        <div className="px-4 py-2">
          <h2 className="text-gray-800 text-lg font-semibold mb-2">
            Specialties: {doctor.specialization}
          </h2>
          <ul className="text-gray-700">
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

