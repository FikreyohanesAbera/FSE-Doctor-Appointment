import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
      role
    }
    // console.log("logging", user)
    fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => {
      if (!response.ok) {
        alert("Wrong Credentials.")
        throw new Error('Something went wrong with the sign-up request');
      } 

      return response.json();
    }).then(data => {
      const token = data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      document.cookie = `token=${token}; expires=${new Date(Date.now() + 3600000)}; path=/`;
      if (user.role == "user"){
        navigate('/Patient_pro');
      } else if(user.role == "admin"){
        navigate('/Admin');
      } else if (user.role == "labtechnician"){
        navigate('/LabTechnician');
      }
      else if (user.role == "doctor"){
        navigate('/DoctorProfile');
      }
      
    })
    .catch(error => {
      console.error('Error during login:', error);
    });

}

    

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
          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
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
                onChange={(event) => setEmail(event.target.value)}
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
                min="6"
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-800 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="grid-flow-col">
          <div className="grid-flow-col grid-cols-2 grid-rows-2 gap-4">
            <div className="form-check ">
              <input
                className="form-check-input mr-2 "
                type="radio"
                name="role"
                id="user-radio"
                value="doctor"
                required
                onChange={(event) => setRole(event.target.value)}
              />
              <label className="form-check-label" htmlFor="user-radio">
                Doctor
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input mr-2"
                type="radio"
                name="role"
                id="user-radio"
                value="user"
                required
                onChange={(event) => setRole(event.target.value)}
              />
              <label className="form-check-label" htmlFor="user-radio">
                User
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input mr-2"
                type="radio"
                name="role"
                id="lab-radio"
                value="labtechnician"
                required
                onChange={(event) => setRole(event.target.value)}
              />
              <label className="form-check-label" htmlFor="lab-radio">
                Lab Technician
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input mr-2"
                type="radio"
                name="role"
                id="admin-radio"
                value="admin"
                required
                onChange={(event) => setRole(event.target.value)}
              />
              <label className="form-check-label" htmlFor="admin-radio">
                Admin
              </label>
            </div>
          </div>
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
              <a href="/Signup" className="text-blue-500 hover:underline">
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

