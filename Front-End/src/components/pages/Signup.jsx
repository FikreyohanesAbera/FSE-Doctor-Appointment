import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Patient_pro");

    // Add form submission logic here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
      }}
    >
      <div className="min-h-screen flex items-center justify-center mt-6 mb-6 bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-800">
              Sign Up
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Create an account to get started
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
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="phone"
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
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter your password"
              />
            </div>
            <div className="text-center mt-4">
              <span className="text-gray-800">Or sign in with</span>
              <div className="flex justify-center mt-2">
                <button className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-300 mr-2">
                  Google
                </button>
                <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 ml-2">
                  Apple
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-800">Don't have an account?</p>
            <a href="#" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </div>
          <div className="text-center text-sm text-gray-600">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-500">
              Privacy Statement
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};
