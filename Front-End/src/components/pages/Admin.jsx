import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Admin = () => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [data, setData] = useState([]);
  const [approved, setApprove] = useState();
  const [declined, setDeclined] = useState();

  const handleApprove = (e, application) => {
    const updatedData = data.map((app) => {
      if (app.userId === application.userId) {
        setApprove(app)
        console.log("approve", approved, app)
        return { ...app, status: "accepted" };
      } else {
        return app;
      }
    });
    setData(updatedData);
    approved.status = "accepted"
    postApplication(approved);

  }
  const postApplication = (app) => {

    console.log("posting", app)
    fetch('http://localhost:3001/apply/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(app)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong with the sign-up request');
      } else {
        alert("yes")
      }

      return response.json();
    }).then(data => {
      console.log("submitted", data)
    })
      .catch(error => {
        console.error('Error during sign-up:', error);
      });
  }

  const handleDecline = (e, application) => {
    const updatedData = data.map((app) => {
      if (app.userId === application.userId) {
        setDeclined(app)
        return { ...app, status: "declined" };

      } else {
        return app;
      }
    });
    setData(updatedData);
    declined.status = "declined"
    postApplication(declined);
  }

  const fetchApplicationRequests = () => {
    fetch(`http://localhost:3001/apply`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    console.log(data, "changed?")
  }, [data])
  useEffect(() => {
    const token = document.cookie;
    fetch(`http://localhost:3001/users/profile`, {
      method: 'POST',
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
        console.log(data);
        setEmail(data.email)
        setFirstname(data.firstName)
        setPhone(data.phone)
        // patientData = data
      })
      .catch((error) => {
        // Handle any errors that occur
        console.error('Error:', error);
      });
    fetchApplicationRequests()

  }
    , []); // Empty dependency array to run the effect only once when the component mounts

  const [docInfo, setDocInfo] = useState([]);
  const [labInfo, setLabInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/admin")
      .then(res => res.json())
      .then(data => {
        setLabInfo(data.labInfo);

      })
  }, [])
  const [approvallabStatus, setApprovallabStatus] = useState(Array(0).fill(false));
  const [disapprovallabStatus, setDisApprovallabStatus] = useState(Array(0).fill(false));

  const handlelabApprove = (index) => {
    setApprovallabStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = true;
      return newStatus;
    });
  };
  const handlelabDisApprove = (index) => {
    setDisApprovallabStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = true;
      return newStatus;
    });
  };

  const handlelabClick = (id, ind) => {
    fetch("http://localhost:3001/labTechReq", {
      method: "POST",
      body: JSON.stringify({
        labreqId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handlelabApprove(ind));

  }
  const handleRejectLabClick = (id, ind) => {
    fetch("http://localhost:3001/rejectlabapply", {
      method: "POST",
      body: JSON.stringify({
        labreqId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          handlelabDisApprove(ind);
        }
      })
  }

  return (
    <div className="min-h-screen grid items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center m-auto space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Admin Profile
          </h2>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            className="w-32 h-32 rounded-full"
          />
          <h3 className="text-xl font-bold">{firstName}</h3>
          <p>{email}</p>
          <p>Phone: {phone}</p>
        </div>

      </div>
      <h1 className="my-5 text-center text-3xl font-bold text-gray-800">Staff Application Requests</h1>

      <div className="flex gap-5 flex-wrap">
        {data.map((application) => (
          <div
            key={application.userid}
            className="bg-white p-6 min-w-full rounded-md shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">User Id : {application.userId}</h3>
            <p className="text-gray-700 mb-4">Department: {application.department}</p>
            <p className="text-gray-800 mb-4">Status: {application.status}</p>

            <button
              onClick={(e) => handleApprove(e, application)}
              className="bg-blue-500 text-white py-2 px-4 p-5 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
            >
              Approve
            </button>
            <button
              onClick={(e) => handleDecline(e, application)}
              className="bg-blue-500 text-white py-2 px-4 p-5 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
            >
              Decline
            </button>
          </div>
        ))}

      </div>
      <h1 className="mt-5 text-center text-3xl font-bold text-gray-800">Lab Requests</h1>
      <div className="flex gap-5 flex-wrap">
      {(labInfo.length > 0) ?
        labInfo.map((element, index) => {
          return (<div className="bg-white p-6 min-w-full rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-2">Patient Name: {element.patientName}</h3>
            <p className="text-gray-700 mb-4">Description: {element.description}</p>
            <p className="text-gray-800 mb-4">Doctor Name: {element.doctorName}</p>

            <button className="bg-blue-500 text-white py-2 px-4 p-5 rounded-md hover:bg-blue-600 transition duration-300 mr-2" onClick={() => handlelabClick(element.labreqId, index)} disabled={approvallabStatus[index]}  >{approvallabStatus[index] ? 'Approved' : 'Approve'}</button>
            <button className="bg-blue-500 text-white py-2 px-4 p-5 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
              onClick={() => handleRejectLabClick(element.labreqId, index)} disabled={disapprovallabStatus[index]}  >{disapprovallabStatus[index] ? 'Rejected' : 'Reject'}</button>

          </div>


          )
        }) : <h2 className="text-center my-4 m-auto"><strong>No Lab Requests</strong></h2>}

      </div>
      
    </div>
  );
};
