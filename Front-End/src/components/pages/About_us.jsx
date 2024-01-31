import React from "react";
import logo from "../images/logo-tech.png";

export const About_us = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
      }}
    >
      <div className="relative">
      <div className="mb-5  m-5 p-3 rounded">
          <p className="text-3xl border-2  m-2 p-5 rounded "> About Us</p>
        </div>

        <p className="text-center m-5 p-5 text-2xl">
          Efoyta Doctor's Appointment Booking System
        </p>
        <div>
          <div className="flex justify-center align-center p-3 m-5">
            <img src={logo} className="border-4 rounded shadow-2xl w-[300px] h-[300px]" />
          </div>

          <div className="p-5 m-5 ">
            <p className="border-2 p-4 m-5 rounded shadow-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              porro velit animi veniam cumque ad molestiae cupiditate, aliquid
              pariatur dolorum mollitia, nulla optio maiores aperiam assumenda
              iure blanditiis reprehenderit nam eaque. Dolorum incidunt non
              laborum sed, perferendis sunt sint, accusantium, nobis mollitia
              laboriosam est exercitationem praesentium nulla magni tempora
              accusamus.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 m-3 my-7">
          <img src={logo} className="p-5 m-5"></img>
          <div className="flex justify-center align-center mt-7 p-5 mx-5 border-2 shadow-2xl">
            <p className="flex justify-center align-center p-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              facere consectetur, ipsum blanditiis dolore delectus modi
              incidunt, possimus, id praesentium error dolorem alias quod
              ratione reprehenderit dignissimos distinctio ea cumque numquam
              rem. Dolores nobis dolore saepe eveniet dolor nam, enim modi ipsam
              velit repudiandae quisquam vel quod at dicta harum. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Natus qui sit vitae
              illum odit unde autem. Error voluptatibus sed pariatur.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 m-3 my-7">
          <div className="flex justify-center align-center mt-7 p-5 mx-5 border-2 shadow-2xl">
            <p className="flex justify-center align-center p-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              facere consectetur, ipsum blanditiis dolore delectus modi
              incidunt, possimus, id praesentium error dolorem alias quod
              ratione reprehenderit dignissimos distinctio ea cumque numquam
              rem. Dolores nobis dolore saepe eveniet dolor nam, enim modi ipsam
              velit repudiandae quisquam vel quod at dicta harum. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Natus qui sit vitae
              illum odit unde autem. Error voluptatibus sed pariatur.
            </p>
          </div>
          <img src={logo} className="p-5 m-5"></img>
        </div>

        <div className="grid grid-cols-2 m-3 my-7">
          <img src={logo} className="p-5 m-5"></img>
          <div className="flex justify-center align-center mt-7 p-5 mx-5 border-2 shadow-2xl">
            <p className="flex justify-center align-center p-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              facere consectetur, ipsum blanditiis dolore delectus modi
              incidunt, possimus, id praesentium error dolorem alias quod
              ratione reprehenderit dignissimos distinctio ea cumque numquam
              rem. Dolores nobis dolore saepe eveniet dolor nam, enim modi ipsam
              velit repudiandae quisquam vel quod at dicta harum. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Natus qui sit vitae
              illum odit unde autem. Error voluptatibus sed pariatur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
