import React from "react";
import { useState } from "react";


export const Privilage_doc = () => {
  const [error,setError] = useState('')
  const [clicked,setClick] = useState(false)


  const [formData, setFormData] = useState({
    name: '',
    start: '',
    end: '',
  });
  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(JSON.stringify(formData))
    fetch('http://localhost:8000/apply', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setClick(true);
        if (data.status === "error"){
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
      }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-4 mb-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-800">
              Apply For Doctor
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Create your doctor account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                onChange={handleChange}
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <div class="mb-3">
                <label for="spec" class="form-label">Specialization</label>
                <input className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange} type="text" id="spec" name="spec" required placeholder = "Enter your specializations"/>
              </div>
              <div class="mb-3">
                <label for="start" class="form-label">Start</label>
                <input className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange} type="time" id="start" name="start" required />
              </div>
              <div class="mb-3">
                <label for="end" class="form-label">End</label>
                <input className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  onChange={handleChange} type="time" id="end" name="end" required />
              </div>

            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                onChange={handleChange}

                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onChange={handleChange}

                id="password"
                name="password"
                type="password"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <input
                onChange={handleChange}

                id="skills"
                name="skills"
                type="text"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your skills"
              />
            </div>
            <div>
              <label

                htmlFor="experience"
                className="block text-sm font-medium text-gray-700"
              >
                Experience
              </label>
              <input
                onChange={handleChange}

                id="experience"
                name="experience"
                type="text"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your experience"
              />
            </div>
            <div>
              <label
                htmlFor="educationLevel"
                className="block text-sm font-medium text-gray-700"
              >
                Education Level
              </label>
              <input
                onChange={handleChange}

                id="educationLevel"
                name="educationLevel"
                type="text"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your education level"
              />
            </div>
            <div>
              <label
                htmlFor="availableLocation"
                className="block text-sm font-medium text-gray-700"
              >
                Available Location
              </label>
              <input
                onChange={handleChange}

                id="availableLocation"
                name="availableLocation"
                type="text"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your available location"
              />
            </div>
            <div>
              <label
                htmlFor="additionalBio"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Bio
              </label>
              <textarea
                onChange={handleChange}

                id="additionalBio"
                name="additionalBio"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter additional bio"
                rows="3"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-600">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-500">
              Privacy Statement
            </a>
            .
          </div>
          {/* to be styled */}
          {(clicked) ? <div class="alert alert-success" role="alert" id="success">{(error) ? "Error": "Success"}</div>: null}
          
        </div>
      </div>
    </div>
  );
};
