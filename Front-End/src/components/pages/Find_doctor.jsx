import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Find_doctor = () => {
  const [apiUsers, setApiUsers] = useState([])
  const [loading, setLoading] = useState(true)
  // initialize the error state as null
  const [error, setError] = useState(null)
  const [searchItem, setSearchItem] = useState('')
  // set the initial state of filteredUsers to an empty array
  const [filteredUsers, setFilteredUsers] = useState([])


  // fetch the users
  useEffect(() => {
    fetch('http://localhost:3001/doctors')
      .then(response => response.json())
      .then(data => {
        setApiUsers(data)
        // update the filteredUsers state
        setFilteredUsers(data)
        console.log(data)
      })
      .catch(err => {
        console.log(err)
        setError(err)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    // filter the items using the apiUsers state
    const filteredItems = apiUsers.filter((user) => {
      return user.firstName.toLowerCase().includes(searchTerm.toLowerCase())

    }
    );
    setFilteredUsers(filteredItems);
  }


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
        <div className="container w-full bg-slate-500 w-ful rounded-md p-5">
          <h1 className="text-4xl font-bold text-center mb-8 text-white ">
            Find a Doctor
          </h1>
          <div>
            <input
              type="text"
              value={searchItem}
              className="w-full rounded-sm p-2"
              onChange={handleInputChange}
              placeholder='Type to search'
            />
            {/* if the data is loading, show a proper message */}
            {loading && <p>Loading...</p>}
            {/* if there's an error, show a proper message */}
            {error && <p>There was an error loading the users</p>}
            {/* if it finished loading, render the items */}
            {!loading && !error && filteredUsers.length === 0
              ? <p>No users found</p>
              :
              <div className="grid my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-dark">
                {filteredUsers.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white p-6 rounded-md shadow-md"
                  >
                    <img
                      src={doctor.image}
                      alt={`Dr. ${doctor.firstName}`}
                      className="w-full mb-4 rounded-md"
                    />
                    <h3 className="text-xl font-semibold mb-2">{doctor.firstName + " " + doctor.lastName}</h3>
                    <p className="text-gray-700 mb-4">Specialization: {doctor.specialization}</p>
                    <p className="text-gray-800 mb-4">Daily Start: {doctor.fromTime}</p>
                    <p className="text-gray-800 mb-4">Daily End: {doctor.toTime}</p>
                    <p className="text-gray-800 mb-4">Email: {doctor.email}</p>
                    <p className="text-gray-800 mb-4">Rating: {doctor.rating}</p>

                    <Link to={`/Doctors/${doctor.id}`}>
                      <button
                        className="bg-blue-500 text-white py-2 px-4 p-5 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
                      >
                        details
                      </button>
                    </Link>
                    <Link to ={`/Get_appointment/${doctor.id}`} className="p-5">
                      <button
                        onClick={() => handleGetAppointment(doctor.id)}
                        className="bg-blue-500 text-white py-2 px-4 p-5 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
                      >
                        book doctor
                      </button>
                    </Link>

                  </div>
                ))}
              </div>
            }

          </div>

        </div>
      </div>
    </div>
  );
};
