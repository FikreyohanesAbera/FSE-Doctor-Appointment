import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Find_doctor = () => {
  const [doctors,setDoctors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/findadoc")
    .then(res => res.json())
     .then(data => {
      console.log(data.doctorsData)
      setDoctors(data.doctorsData)
    }
      );
    

  },[])
  // const doctors = [
  //   {
  //     image: "https://ibb.co/gr74djw",
  //     id: 1,
  //     name: "Dr. John Doe",
  //     specialization: "Cardiologist",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida urna et pharetra aliquet.",
  //   },
  //   {
  //     image: "https://example.com/doctor2.jpg",
  //     id: 2,
  //     name: "Dr. Jane Smith",
  //     specialization: "Pediatrician",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida urna et pharetra aliquet.",
  //   },
  //   {
  //     image: "https://example.com/doctor3.jpg",
  //     id: 3,
  //     name: "Dr. Michael Johnson",
  //     specialization: "Dermatologist",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida urna et pharetra aliquet.",
  //   },
  //   {
  //     image: "https://example.com/doctor4.jpg",
  //     id: 4,
  //     name: "Dr. Emily Williams",
  //     specialization: "Neurologist",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida urna et pharetra aliquet.",
  //   },
  // ];

  const handleGetAppointment = (doctorId) => {
    console.log(`Appointment booked with doctor ID: ${doctorId}`);
  };

  const handleSignUp = () => {
    console.log("Redirecting to sign-up page");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
      }}
    >
      <div
        className=" py-10"
        style={{
          backgroundImage: `url("https://example.com/medical-background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">
            Find a Doctor
          </h1>

          {/* Doctors List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-6 rounded-md shadow-md"
              >
                <img
                  src={doctor.image}
                  alt={`Dr. ${doctor.name}`}
                  className="w-full mb-4 rounded-md"
                />
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-gray-700 mb-4">{doctor.specialization}</p>
                <p className="text-gray-800 mb-4">{doctor.description}</p>
                <Link to={`/Doctors/${doctor.id}`}>
                  <button
                    onClick={() => handleGetAppointment(doctor.id)}
                    className="bg-blue-500 text-white py-2 px-4 p-5 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
                  >
                    Docter details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
