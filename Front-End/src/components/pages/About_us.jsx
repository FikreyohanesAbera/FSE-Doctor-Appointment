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
      <div className="mb-5  m-5 p-3 rounded-lg">
          <p className="text-3xl   m-2 p-5 rounded-lg "> About Us</p>
        </div>

        <p className="text-center m-5 p-5 text-2xl">
          Efoyta Doctor's Appointment Booking System
        </p>
        <div>
          <div className="flex justify-center align-center p-3 m-5">
            <img src={logo} className="border-4 rounded-lg shadow-2xl w-[300px] h-[300px]" />
          </div>

          <div className="p-5 m-5">
            <p className="border-2 p-4 m-5 rounded-lg shadow-2xl bg-slate-800 text-slate-50">
            Efoyta Doctor's Appointment Booking System is a comprehensive web application designed to streamline the processes involved in managing doctor's appointments, facilitating communication between doctors, patients, and lab technicians. This user-friendly platform offers a range of features and functionalities to enhance the efficiency of the healthcare system.
            Efoyta allows them to conveniently schedule and manage their appointments with doctors. They can access the system to view available time slots, select a preferred doctor, and book an appointment.
            Overall, Efoyta Doctor's Appointment Booking System offers a comprehensive solution for appointment management, billing, and test request handling, facilitating seamless communication and coordination among doctors, patients, and lab technicians.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 m-3 my-7">
          <img src="./images/DocnPat.jpg" className="p-5 m-5"></img>
          <div className="flex justify-center align-center mt-7 p-5 mx-5 border-2 shadow-2xl bg-orange-300 rounded-lg">
            <p className="flex justify-center align-center p-5">
            Efoyta Doctor's Appointment Booking System prioritizes patient convenience and provides a user-friendly interface for scheduling and managing appointments with doctors.

When patients access the Efoyta platform, they are presented with an intuitive interface that displays the available time slots for various doctors. This allows patients to easily identify convenient appointment times that suit their schedules. They can view the doctors' profiles, including their specialties and credentials, enabling patients to make informed decisions when selecting a preferred doctor.

Once patients have chosen a suitable time slot and doctor, they can proceed to book the appointment directly through the platform. This eliminates the need for traditional methods, such as calling the doctor's office or visiting in person to make an appointment. By streamlining the appointment booking process, Efoyta saves patients time and effort.

Moreover, Efoyta provides a secure payment gateway that allows patients to settle their appointment bills online. Patients can securely enter their payment information within the platform, ensuring secure transactions and protecting their sensitive data. This eliminates the need for manual cash or card payments during the visit, making the entire experience more convenient and hassle-free for patients.

By offering features such as easy appointment scheduling, doctor selection, and secure online payment options, Efoyta prioritizes patient convenience and enhances the overall patient experience when it comes to managing appointments with doctors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 m-3 my-7">
          <div className="flex justify-center align-center mt-7 p-5 mx-5 border-2 shadow-2xl bg-rose-300 rounded-lg">
            <p className="flex justify-center align-center p-5">
            Efoyta Doctor's Appointment Booking System streamlines the process of requesting lab tests for doctors, providing a seamless and efficient communication channel between doctors and lab technicians.

Within the Efoyta platform, doctors have the capability to submit lab test requests directly to the lab technicians. This feature eliminates the need for manual paperwork and traditional methods of requesting tests, such as filling out forms or sending requests via email or fax. By leveraging the digital capabilities of Efoyta, doctors can conveniently submit test requests with just a few clicks.

When submitting a test request, doctors can provide all the necessary details and patient information directly through the system. They can include specific instructions, such as the type of test required, the urgency, and any additional notes or considerations. This comprehensive information ensures that lab technicians have all the necessary details to perform the tests accurately and efficiently.

By enabling direct communication between doctors and lab technicians, Efoyta eliminates the need for intermediaries or manual transfer of information. This saves significant time and reduces the chances of errors or miscommunication that can occur during manual handoffs. Doctors can have confidence that their requests are transmitted accurately and promptly to the lab technicians, streamlining the entire process.

Additionally, the digital nature of Efoyta allows for seamless tracking and monitoring of test requests. Doctors can easily check the status of their requests, ensuring transparency and visibility into the progress of the tests. This feature enables doctors to stay informed and manage their patients' care effectively.
            </p>
          </div>
          <img src={logo} className="p-5 m-5"></img>
        </div>

        <div className="grid grid-cols-2 m-3 my-7">
          <img src={logo} className="p-5 m-5"></img>
          <div className="flex justify-center align-center mt-7 p-5 mx-5 border-2 shadow-2xl bg-blue-200 rounded-lg">
            <p className="flex justify-center align-center p-5">
            Doctor's Appointment Booking System offers a secure and convenient payment gateway for patients to settle their appointment bills online.

When patients use Efoyta to book appointments with doctors, they also have the option to make payments for their appointments directly through the platform. Efoyta ensures the security of these transactions by providing a robust and encrypted payment gateway.

To make a payment, patients can securely enter their payment information, such as credit or debit card details, within the Efoyta platform. The system employs industry-standard security measures to protect sensitive data, ensuring that patient information is encrypted and safeguarded.

By offering online payment options, Efoyta eliminates the need for patients to carry cash or physically present their payment cards during the visit. This enhances convenience for patients, as they do not have to worry about carrying the correct amount of cash or facing any delays due to payment processing at the clinic.

Moreover, the secure payment gateway provided by Efoyta ensures that patients' financial information is protected. The platform employs best practices in data security to prevent unauthorized access or misuse of patient data. This instills confidence in patients that their payment information is handled securely and confidentially.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
