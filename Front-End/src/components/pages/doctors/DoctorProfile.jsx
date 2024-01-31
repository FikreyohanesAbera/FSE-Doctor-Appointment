import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function DoctorProfile() {
    const [data, setData] = useState({

    });
    const [filename, setFileName] = useState('');
    const [visits, setVisits] = useState([]);
    const [history, setHistory] = useState({

    });
    const [formData, setFormData] = useState({

    });
    const [formDataY, setFormDataY] = useState({

    });
    const [isempty, setIsEmpty] = useState(true);

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
        const token = document.cookie;
        fetch("http://localhost:3001/labdocresult", {
          method: 'POST',
          body: JSON.stringify({
            token: token
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(response => {
            if (response.filePath){
                console.log(response);
              setFileName(response.filePath);
              setIsEmpty(false);
    
            }
    
          })
    
      }, [])
      const handleDownload = () => {
        window.open(`http://localhost:3001/download/${filename}`, '_blank');
      };
    useEffect(() => {
        // mine
        fetch("http://localhost:3001/doctorProfile", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: document.cookie

            })

        })
            .then(res => res.json())
            .then(response => {
                console.log(response.data);
                setData(response.data);



            })



        fetch("http://localhost:3001/dailyvisits", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: document.cookie

            })

        })
            .then(res => res.json())
            .then(response => {
                let arr = response.dailyApps;

                arr.map(info => {
                    const date = new Date(info.time);
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    info.time = `${hours}:${minutes}`;
                })
                setVisits(arr);
            })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()


        let sentData = formData;

        sentData["token"] = document.cookie;
        fetch("http://localhost:3001/labrequest", {
            method: 'POST',
            credentials: "include",

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(sentData),
        }).then(res => res.json())
            .then(data => {
                if (!data.status === "success") {
                    setError("request unsuccessful");
                    alert("Something went wrong")

                }
                else {
                    alert("success");

                }
            })
    }
    const handleSubmitY = (e) => {
        e.preventDefault()
        // mine

        let sentData = formDataY;
        sentData["token"] = document.cookie;


        fetch("http://localhost:3001/patientmedhistory", {
            method: 'POST',
            credentials: "include",

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sentData),
        }).then(res => res.json())
            .then(data => {
                if (data.status === "error") {
                    setError("request unsuccessful");
                    alert("Something went wrong")

                }
                else {
                    alert("Successfully Recorded")
                }
                // else{

                // }
            })
    }




    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cover" style={{
            backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
        }}>



            <div>
                <h2 className="text-center text-3xl font-bold text-gray-800">
                    Doctor Profile
                </h2>
            </div>
            <div className="flex flex-col items-center space-y-4">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-full"
                />
                <h3 className="text-xl font-bold">Name: {data.name}</h3>
                <p>Email: {data.specialization}</p>
                <p>Starting time: {data.fromTime}</p>
                <p>Finishing time: {data.toTime}</p>


            </div>

            {/* dailyvisits */}
            <h2 className="text-center mt-8 text-3xl font-bold text-gray-800">
                Today's Visits
            </h2>

            <div className="max-w-4xl mx-auto my-4">
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 border-b">Patient Name</th>
                            <th class="py-2 px-4 border-b">Time</th>
                            {/* <th class="py-2 px-4 border-b">Reason</th> */}

                        </tr>

                    </thead>

                    <tbody>

                        {visits.map((element) => (


                            <tr>
                                <td class="py-2 px-4 border-b">{element.patientName}</td>
                                <td class="py-2 px-4 border-b">{element.time}</td>
                                {/* <td class="py-2 px-4 border-b">{element.reason}</td> */}

                            </tr>


                        ))}
                    </tbody>
                </table>

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
                <Link to={`/OrderCheckup`} className="p-5">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Order checkup
                    </button>
                </Link>
                {(!isempty) ?
            <div className="text-center mt-5">
              <h2 className="text-center text-3xl font-bold text-gray-800">LabResults</h2>
              <button className="bg-blue-500 my-3 m-auto text-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleDownload}>
                Download File
              </button> </div> : null}

            </div>

        </div>

    );
}

export default DoctorProfile;