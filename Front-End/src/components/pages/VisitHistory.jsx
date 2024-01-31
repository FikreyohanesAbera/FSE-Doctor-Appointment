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
            <div class="max-w-4xl mx-auto my-4">

                    <table class="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th class="py-2 px-4 border-b">Doctor Name</th>
                                <th class="py-2 px-4 border-b">Description</th>
                                <th class="py-2 px-4 border-b">Date</th>
                                <th class="py-2 px-4 border-b">Diagnosis Result</th>

                            </tr>

                        </thead>

                        <tbody>

                            {visitHistory.map((element) => (

                                <tr>
                                    <td class="py-2 px-4 border-b">{element.doctorName}</td>
                                    <td class="py-2 px-4 border-b">{element.reason}</td>
                                    <td class="py-2 px-4 border-b">{element.date}</td>

                                </tr>


                            ))}
                        </tbody>
                    </table>
                </div>


    </div>

    )
       
};
