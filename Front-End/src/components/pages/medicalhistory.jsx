import React from "react";
import { useState, useEffect } from "react";


export const MedicalHistory = () => {
    const [medicalHistory, setmedicalHistory] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/patienthistory",{
            method: "POST",
            body: JSON.stringify({
                token: document.cookie
            }),
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(res => res.json())
            .then(data => {
                console.log(data.medHistory)
                setmedicalHistory(data.medHistory)
            });
    }, [])

    return (
        <div>
            <h2 className="text-2xl text-center font-bold mb-4">Medical History</h2>

                <div class="max-w-4xl mx-auto my-4">

                    <table class="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th class="py-2 px-4 border-b">Description</th>
                                <th class="py-2 px-4 border-b">Date</th>
                                <th class="py-2 px-4 border-b">Diagnosis Result</th>

                            </tr>

                        </thead>

                        <tbody>

                            {medicalHistory.map((element) => (

                                <tr>
                                    <td class="py-2 px-4 border-b">{element.reason}</td>
                                    <td class="py-2 px-4 border-b">{element.date}</td>
                                    <td class="py-2 px-4 border-b">{element.diagnosisResult}</td>

                                </tr>


                            ))}
                        </tbody>
                    </table>
                </div>
        </div>

    )

};
