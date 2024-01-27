import React from "react";

export const Get_appointment = () => {
  const handleBookAppointment = () => {
    // Logic to book appointment
    console.log("Appointment booked!");
  };

  return (
    <div className="container mx-auto bg-cyan-100">
      <h1 className="text-4xl font-bold text-center mb-8">Get Appointment</h1>

      {/* Appointment Form */}
      <form onSubmit={handleBookAppointment} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full px-4 py-2 rounded-md border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 rounded-md border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full px-4 py-2 rounded-md border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="appointmentDate"
            className="block text-gray-700 font-semibold mb-2"
          >
            Preferred Date for Appointment
          </label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
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
    </div>
  );
};
