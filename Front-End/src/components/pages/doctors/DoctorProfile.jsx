import { useState, useEffect } from "react";
function DoctorProfile() {
    const [data, setData] = useState({

    });
    const [visits, setVisits] = useState([]);
    const [history, setHistory] = useState({

    });
    const [formData, setFormData] = useState({

    });
    const [formDataY, setFormDataY] = useState({

    });
    const [error, setError] = useState('')
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleChangeY = (e) => {

        const { name, value } = e.target;
        setFormDataY({
            ...formDataY,
            [name]: value,
        });
    };
    useEffect(() => {
        fetch("http://localhost:8000/doctorProfile", {
            method: 'GET',
            credentials: "include",

        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                setData(response.data);
            })
        fetch("http://localhost:8000/dailyvisits", {
            method: 'GET',
            credentials: "include",

        })
            .then(res => res.json())
            .then(response => {
                console.log(response.dailyApps)
                setVisits(response.dailyApps);
            })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:8000/labrequest", {
            method: 'POST',
            credentials: "include",

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.status === "success") {
                    setError("request unsuccessful");

                }
            })
    }
    const handleSubmitY = (e) => {
        e.preventDefault()

        fetch("http://localhost:8000/patienthistory", {
            method: 'POST',
            credentials: "include",

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataY),
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === "error") {
                    setError("request unsuccessful");

                }
                // else{

                // }
            })
    }




    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cover" style={{
            backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
        }}>
            {/* dailyvisits */}
            <div>
                {console.log(visits)}
                {visits.map(elt =>
                (<div>
                    <h1>Patient name:{elt.patientid}</h1>
                    <h1>time:{elt.time}</h1>
                    <h2>reason:{elt.time}</h2>
                </div>)

                )}

            </div>
            <div id="doc--container">
                <div class="doc--card">
                    <h2>
                        {data.name}
                    </h2>
                    <h4>
                        {data.specialization}
                    </h4>
                    <h5>
                        {data.fromTime}
                    </h5>
                    <h5>
                        {data.toTime}
                    </h5>
                    <h5>
                        {data.phone}
                    </h5>


                </div>

            </div>
            <div
                className="min-h-screen flex flex-col items-center justify-center bg-cover"
                style={{
                    backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
                }}
            >
                <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-8 sm:px-6 lg:px-16 mt-4 mb-4">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="text-center text-3xl font-bold text-gray-800">
                                Lab Request
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>
                                <input
                                    onChange={handleChange}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={handleChange}

                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    placeholder="Enter lab tech email"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="additionalBio"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    onChange={handleChange}

                                    id="desc"
                                    name="desc"
                                    required
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    placeholder="Enter description"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Request
                                </button>
                            </div>
                        </form>
                        {/* to be styled */}
                        {/* {(clicked) ? <div class="alert alert-success" role="alert" id="success">{(error) ? "Error": "Success"}</div>: null} */}

                    </div>
                </div>
                <div>
                    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-4 mb-4">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <h2 className="text-center text-3xl font-bold text-gray-800">
                                    Set Medical History
                                </h2>
                            </div>
                            <form onSubmit={handleSubmitY} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Patient Email
                                    </label>
                                    <input
                                        onChange={handleChangeY}

                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        placeholder="Enter patient email"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Date
                                    </label>
                                    <input
                                        onChange={handleChangeY}
                                        id="date"
                                        name="date"
                                        type="date"
                                        required
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        placeholder="Enter date"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="diagnosisResult"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Diagnosis result
                                    </label>
                                    <input
                                        onChange={handleChangeY}
                                        id="diagnosisResult"
                                        name="diagnosisResult"
                                        type="text"
                                        required
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        placeholder="Enter the diagnosis result"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="reason"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Reason
                                    </label>
                                    <textarea
                                        onChange={handleChangeY}

                                        id="reason"
                                        name="reason"
                                        required
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        placeholder="Enter reason"
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Record
                                    </button>
                                </div>
                            </form>
                            {/* to be styled */}
                            {/* {(clicked) ? <div class="alert alert-success" role="alert" id="success">{(error) ? "Error": "Success"}</div>: null} */}

                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default DoctorProfile;