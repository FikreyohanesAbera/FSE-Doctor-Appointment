import React from "react";
import { Link } from "react-router-dom";
import {
  FaYoutubeSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-[#000300] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
      <div>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">Efoyta.</h1>
        <p className="py-4">
          Prioritize your well-being with us! Experience personalized care and
          convenience at every doctor's appointment. Your health journey starts
          here - schedule your wellness with confidence and ease.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaYoutubeSquare size={30} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div className="sm:pl-24">
          <h6 className="font-medium text-gray-400">Quick Links</h6>
          <ul>
            <Link to="Home">
              <li className="py-2 text-sm">Home</li>
            </Link>

            <Link to="About_us">
              <li className="py-2 text-sm">About Us</li>
            </Link>

            <Link to="Find_doctor">
              <li className="py-2 text-sm">Find Doctor</li>
            </Link>

            <Link to="Contact">
              <li className="py-2 text-sm">Contact</li>
            </Link>
          </ul>
        </div>
        <div className="sm:pr-24">
          <h6 className="font-medium text-gray-400">I want to know about:</h6>
          <ul>
            <li className="py-2 text-sm">the hospital</li>
            <li className="py-2 text-sm">your privacy</li>
            <li className="py-2 text-sm">Appointment handling</li>
            <li className="py-2 text-sm">how to use the software</li>
          </ul>
        </div>
        {/* <div>
        <h6 className='font-medium text-gray-400'>About the Hospital:</h6>
        <ul>
            <li className='py-2 text-sm'>Location</li>
            <li className='py-2 text-sm'>Experience</li>
            <li className='py-2 text-sm'>User's feedback</li>
            <li className='py-2 text-sm'>Working time</li>
            <li className='py-2 text-sm'>More FAQ</li>
        </ul>
    </div> */}
        {/* <div>
        <h6 className='font-medium text-gray-400'>Legal Informations</h6>
        <ul>
            <li className='py-2 text-sm'>Claim</li>
            <li className='py-2 text-sm'>Policy</li>
            <li className='py-2 text-sm'>Terms</li>
        </ul>
    </div> */}
      </div>
    </div>
  );
};
