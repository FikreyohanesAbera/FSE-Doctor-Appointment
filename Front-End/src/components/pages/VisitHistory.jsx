import React from "react";
import { useState, useEffect } from "react";


export const VisitHistory = () => {
    const [visitHistory, setvisitHistory] = useState([]);
    useEffect(() => {
        console.log("yigebal")
        fetch("http://localhost:8000/visithistory")
            .then(res => res.json())
            .then(data => {
                console.log(data.visHistory[0])
                setvisitHistory(data.visHistory)
            });
    }, [])

    return (
        <div>
            <h2 className="text-2xl text-center font-bold mb-4">Visit History</h2>

        {visitHistory.map((element, index) => (
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
                    <label className="block text-gray-700 font-bold mb-2">Date:</label>
                    <p className="text-gray-800">{element.date}</p>
                </div>
            </div>
        ))}
    </div>

    )
       
};
