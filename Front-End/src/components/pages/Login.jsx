import React from "react";

export const Login = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
      }}
    >
      <div className="flex items-center justify-center bg-white mt-5">
        <div className=" shadow-md rounded-lg p-8 w-96">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Login</h1>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="email" className="text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2 text-gray-800">Remember me</span>
                </label>
              </div>
              <div>
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full mt-4"
              >
                Login
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-800">Don't have an account?</p>
              <a href="#" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-800">
              <p>
                By signing in, you agree to our{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Statement
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
