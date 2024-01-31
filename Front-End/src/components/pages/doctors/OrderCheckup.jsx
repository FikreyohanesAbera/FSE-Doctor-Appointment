import { useState, useEffect } from "react";
function OrderCheckup() {
    const [data, setData] = useState({

    });

    const [formData, setFormData] = useState({

    });

    const [error, setError] = useState('')
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault()


        let sentData = formData;
        console.log(sentData)

        sentData["token"] = document.cookie;
        console.log(sentData)
        fetch("http://localhost:3001/checkup", {
            method: 'POST',
            credentials: "include",

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(sentData),
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.status === "success") {
                    setError("request unsuccessful");
                    alert("Something went wrong")

                }
                else {
                    alert("success");

                }
            })
    }






    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cover" style={{
            backgroundImage: "url('https://source.unsplash.com/1600x900/?medical')",
        }}>
            {/* dailyvisits */}





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
                                Order Checkup
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    date
                                </label>
                                <input
                                    onChange={handleChange}
                                    id="date"
                                    name="date"
                                    type="date"
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
                                    placeholder="Enter patient Email"
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



            </div>



        </div>

    );
}

export default OrderCheckup;