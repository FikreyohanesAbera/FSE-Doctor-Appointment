import React from "react";
import { useState, useEffect } from "react";


export const MedicalHistory = () => {
    const [medicalHistory, setmedicalHistory] = useState([]);
    useEffect(() => {
        console.log("yigebal")
        fetch("http://localhost:8000/patienthistory")
            .then(res => res.json())
            .then(data => {
                console.log(data.medHistory[0])
                setmedicalHistory(data.medHistory)
            });
    }, [])

    return (
        <div>
            <h2 className="text-2xl text-center font-bold mb-4">Medical History</h2>

        {medicalHistory.map((element, index) => (
            <div key={index} className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Doctor Name:</label>
                    <p className="text-gray-800">{element.doctorName}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Reason for Visit:</label>
                    <p className="text-gray-800">{element.reason}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Diagnosis Result:</label>
                    <p className="text-gray-800">{element.diagnosisResult}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Date:</label>
                    <p className="text-gray-800">{element.date}</p>
                </div>
            </div>
        ))}
    </div>

    )
       
};
