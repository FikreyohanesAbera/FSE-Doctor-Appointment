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
          <img src={"data:image/jpeg;base64,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"} alt={doctor.name} className="h-96 w-full object-cover" />
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

