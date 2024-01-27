import React from "react";
import { Link } from "react-router-dom";
// import { Typed } from "react-typed";
// import manStand from "..images/phone.jpg";
// import handNeedle from "../images/hand needle.jpg";
// import manSurgeon from "../images/man-surgeon.jpg";
export const Home = () => {
  return (
    <div>
      <div
        className="min-h-screen flex items-center  bg-cover"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?medical')",
        }}
      >
        <div className="text-white lg:inline-flex">
          <div className="inline-flex justifiy-end max-w-[1240px]">
            <div className="max-w-[1240px] mt-[-96px] w-full h-screen mx-auto text-left flex flex-col justify-center px-4">
              <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 max-w-[550px] pl-2 text-teal-900">
                Efoyta:
              </h1>
              {/* <Typed
                className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 pt-2 bg-gradient-to-r from-lime-300 to-gray-900 bg-clip-text text-transparent"
                strings={["Your Health", "Your Time", "Your Appointment"]}
                typeSpeed={120}
                backSpeed={140}
                loop
              /> */}

              <div className="flex justify-start items-center max-w-[600px]">
                <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4 bg-gradient-to-l from-blue-200 to-gray-900 bg-clip-text text-transparent">
                  Seamless Care at Your Fingertips!
                </p>
              </div>
              <Link to="/Signup">
                <div className="text-left md:pl-40 max-w-[600px]">
                  <button className="bg-gradient-to-r from-green-600 via-yellow-500 to-teal-500 shadow-md w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black ease-in-out duration-300 hover:brightness-150 hover:scale-110">
                    Sign Up
                  </button>
                </div>
              </Link>
            </div>
          </div>
          {/* <div className="flex w-auto sm:justify-center justify-end max-w-[700px] ml-2">
            <img
              className="hidden md:block shadow-lg shadow-black xl:max-w-[350px] w-auto lg:max-w-[250px] md:max-w-[400px] sm:max-w-[200px] h-auto m-2 rounded-xl ease-in-out duration-300 hover:scale-110 brightness-90 hover:brightness-110"
              src={manSurgeon}
              alt="/"
            />
            <div className="hidden md:block md:flex-col m-2">
              <img
                className="w-[300px] p-2 h-[300px] m-2 rounded-[25px] hover:scale-110 ease-in-out duration-300 hover:brightness-110"
                src={manStand}
                alt="/"
              />
              <img
                className="w-[300px] p-2 h-[300px] m-2 rounded-[25px] hover:scale-110 ease-in-out duration-300 hover:brightness-110"
                src={handNeedle}
                alt="/"
              />
            </div>
          </div> */}
        </div>
      </div>
      <div
        className="min-h-screen flex items-center  bg-cover"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?medical')",
        }}
      >
        <div className="w-full py-[10rem] px-4 text-white">
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
            <div className="w-full shadow-lg shadow-black flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-[#000300]">
              <h2 className="text-2xl font-bold text-center py-8 text-[#00df9a]">
                CPR
              </h2>
              <p className="text-center text-xl font-bold">Steps</p>
              <div className="text-start font-medium">
                <p className="py-2 border-b mx-8 mt-8">
                  {" "}
                  * Tap and shout for a response.
                </p>
                <p className="py-2 border-b mx-8">* Call for Help</p>
                <p className="py-2 border-b mx-8">
                  * Tilt the head back to open the airway.
                </p>
                <p className="py-2 border-b mx-8">
                  * Look, listen, and feel for breathing.
                </p>
                <p className="py-2 border-b mx-8">
                  * Start Chest Compressions: For adults and children, use the
                  heel of your hand; for infants, use two fingers. Press hard
                  and fast on the center of the chest.
                </p>
              </div>
              <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">
                Watch Detail
              </button>
            </div>
            <div className=" bg-fixed w-full shadow-lg shadow-black bg-[#000300] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
              <h2 className="text-2xl font-bold text-center py-8 text-[#00df9a]">
                First Aid
              </h2>
              <p className="text-center text-xl font-bold">Steps</p>
              <div className="text-start font-medium">
                <p className="py-2 border-b mx-8 mt-8">
                  * Ensure your safety and the safety of others before providing
                  aid.
                </p>
                <p className="py-2 border-b mx-8 mt-8">
                  * Tap and ask, "Are you okay?"
                </p>
                <p className="py-2 border-b mx-8 mt-8">
                  * Dial emergency services (911) and provide details.
                </p>
                <p className="py-2 border-b mx-8 mt-8">
                  * If unresponsive, tilt the head back.
                </p>
              </div>
              <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">
                Watch Detail
              </button>
            </div>
            <div className="w-full shadow-lg shadow-black flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 bg-[#000300]">
              <h2 className="text-2xl font-bold text-center py-8 text-[#00df9a]">
                Bleeding
              </h2>
              <p className="text-center text-xl font-bold">
                first aid for bleeding
              </p>
              <div className="text-start font-medium">
                <p className="py-2 border-b mx-8 mt-8">
                  * Ensure your safety and the safety of others before
                  approaching the injured person.
                </p>
                <p className="py-2 border-b mx-8 mt-8">* Wear Gloves</p>
                <p className="py-2 border-b mx-8 mt-8 mb-4">
                  * Use a clean cloth or hands to press firmly on the wound.
                </p>
              </div>
              <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">
                Watch Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
