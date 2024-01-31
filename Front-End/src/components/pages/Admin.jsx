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
  const [changed, setChange] = useState();


  const handleApprove = (e, application) => {
    const updatedData = data.map((app) => {
        if (app.userId === application.userId) {
            app.status = "accepted"
            setChange(app)
            // console.log("approve", approved, app)
          return { ...app, status: "accepted" };
        } else {
          return app;
        }
      });
      setData(updatedData);
        }

  const handleDecline = (e, application) => {
    const updatedData = data.map((app) => {
        if (app.userId === application.userId) {
          app.status = "declined"
          setChange(app)
          console.log(changed, "changed")
          return { ...app, status: "declined" };

        } else {
          return app;
        }
      });
      
      setData(updatedData);
      declined.status = "declined"
      console.log("declining")
      
  }

  const postApplication = (app) => {
    fetch('http://localhost:3001/application/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
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

  const fetchApplicationRequests = () => {
    console.log("fetch applications", document.cookie.token)
    fetch(`http://localhost:3001/application`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: "include"
        })
        .then((response)=> {
          if(!response.ok){
            alert("YOU DO NOT HAVE ACCESS!")
          }
          return response.json()

        })
        .then(data => {
          console.log(data, "fetched");
          setData(data)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }

  useEffect(() => {
    console.log(data, "changed?")
    if(changed){
    postApplication(changed);
    }
  }, [data])
  useEffect(() => {
        fetch(`http://localhost:3001/users/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
          console.log("user profile",data);
          setEmail(data.email)
          setFirstname(data.firstName)
          setPhone(data.phone)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        console.log("fetched")
        fetchApplicationRequests()
        
      }
    , []); 


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
          <p>Email: {email}</p>
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
            <p className="text-gray-800 mb-4">Privilege: {application.privilege}</p>
            
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
