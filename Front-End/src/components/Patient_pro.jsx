import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const Patient_pro = () => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [filename, setFileName] = useState('');
  const [isempty, setIsEmpty] = useState(true);

  useEffect(() => {
    const token = document.cookie;
    fetch(`http://localhost:3001/users/profile`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle the fetched data
        setEmail(data.email)
        setFirstname(data.firstName)
        setPhone(data.phone)
        // patientData = data
      })
      .catch((error) => {
        // Handle any errors that occur
        console.error('Error:', error);
      });
  }
    , []); // Empty dependency array to run the effect only once when the component mounts
  const [reached, setReached] = useState(false);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const token = document.cookie;

    fetch("http://localhost:3001/patient", {
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
        setInfo(response.checkups);
        setReached(true);
      })
  }, [])
  useEffect(() => {
    const token = document.cookie;
    fetch("http://localhost:3001/labresult", {
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
          setFileName(response.filePath);
          setIsEmpty(false);

        }

      })

  }, [])
  const handleDownload = () => {
    window.open(`http://localhost:3001/download/${filename}`, '_blank');
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-800">
              Patient Profile
            </h2>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Picture"
              className="w-32 h-32 rounded-full"
            />
            <h3 className="text-xl font-bold">{firstName}</h3>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </div>
          <div className="flex gap-5">
            <Link to="/medicalhistory">
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  View Medical Records
                </button>

              </div>
            </Link>

            <Link to="/Privilage_doc">
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Apply for doctor
                </button>
              </div>
            </Link>

            <Link to="/visithistory">
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  See visit History
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <h1 className="text-center text-3xl font-bold text-gray-800"> Checkups </h1>
      {(reached) ?
        <div class="max-w-4xl mx-auto my-4">

          <table class="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b">Doctor Name</th>
                <th class="py-2 px-4 border-b">Description</th>
                <th class="py-2 px-4 border-b">Date</th>
              </tr>

            </thead>

            <tbody>

              {info.map((elt) => (

                <tr>
                  <td className="py-2 px-4 border-b">{elt.docName}</td>
                  <td className="py-2 px-4 border-b">{elt.data.description}</td>
                  <td className="py-2 px-4 border-b">{elt.data.date}</td>
                </tr>


              ))}
            </tbody>
          </table>
          {(!isempty) ?
            <div className="text-center mt-5">
              <h2 className="text-center text-3xl font-bold text-gray-800">LabResults</h2>
              <button className="bg-blue-500 my-3 m-auto text-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleDownload}>
                Download File
              </button> </div> : null}




          {/* <DownloadButton filename="1706701040292.pdf" /> */}
        </div>

        : null}

      {/* <div className="App"> <h2>Checkup Recommendations</h2><span> {info.checkup.docName}  </span><h3> {info.checkup.data.description}  </h3><h3> {info.checkup.data.date}  </h3></div> : null} */}

    </div>

  );
};
