import React from "react";
import "./app.css";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Home } from "./components/pages/Home";
import { About_us } from "./components/pages/About_us";
import { Find_doctor } from "./components/pages/Find_doctor";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { Route, Routes } from "react-router-dom";
import { Contact } from "./components/pages/Contact";
import { Get_appointment } from "./components/pages/Get_appointment";
import { Doctors } from "./components/pages/doctors/Doctors";
import { Patient_pro } from "./components/Patient_pro";
import Admin from "./components/pages/Admin";
import PdfUploader from "./components/pages/PdfUploader";
import {MedicalHistory} from "./components/pages/medicalhistory";
import {VisitHistory} from "./components/pages/VisitHistory";



import  {Privilage_doc}  from "./components/pages/Privilage_doc";
import DoctorProfile from "./components/pages/doctors/DoctorProfile";

const App = () => (
  <>
    <NavBar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About_us" element={<About_us />} />
        <Route path="/Find_doctor" element={<Find_doctor />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Get_appointment/:id" element={<Get_appointment />} />
        <Route path="/Doctors/:id" element={<Doctors />} />
        <Route path="/Privilage_doc" element={<Privilage_doc />} />
        <Route path="/Patient_pro" element={<Patient_pro />} />
        <Route path = "/admin" element = {<Admin/>}/> 
        <Route path = "/doctorProfile" element = {<DoctorProfile/>}/> 
        <Route path = "/labtest" element = {<PdfUploader/>}/> 
        <Route path = "/medicalhistory" element = {<MedicalHistory/>}/> 
        <Route path = "/visithistory" element = {<VisitHistory/>}/> 





      </Routes>
    </main>
    <Footer />
  </>
);

export default App;
