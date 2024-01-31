import { useState, useEffect } from "react";
function Admin() {
    const [docInfo, setDocInfo] = useState([]);
    const [labInfo, setLabInfo] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/admin")
            .then(res => res.json())
            .then(data => {
                setDocInfo(data.docInfo);
                setLabInfo(data.labInfo);

            })
    }, [])
    const [approvalStatus, setApprovalStatus] = useState(Array(0).fill(false));
    const [approvallabStatus, setApprovallabStatus] = useState(Array(0).fill(false));
    const [disapprovalStatus, setDisApprovalStatus] = useState(Array(0).fill(false));
    const [disapprovallabStatus, setDisApprovallabStatus] = useState(Array(0).fill(false));



    const handleApprove = (index) => {
        setApprovalStatus((prevStatus) => {
            const newStatus = [...prevStatus];
            newStatus[index] = true;
            return newStatus;
        });
    };
    const handlelabApprove = (index) => {
        setApprovallabStatus((prevStatus) => {
            const newStatus = [...prevStatus];
            newStatus[index] = true;
            return newStatus;
        });
    };
    const handleDisApprove = (index) => {
        setDisApprovalStatus((prevStatus) => {
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

    const handleClick = (id, ind) => {
        fetch("http://localhost:8000/approveapply", {
            method: "POST",
            body: JSON.stringify({
                docUserId: id
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    handleApprove(ind);


                }
            })
    }
    const handlelabClick = (id, ind) => {
        fetch("http://localhost:8000/labTechReq", {
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
        fetch("http://localhost:8000/rejectlabapply", {
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
    const handleRejectClick = (id, ind) => {
        fetch("http://localhost:8000/rejectapply", {
            method: "POST",
            body: JSON.stringify({
                docUserId: id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
            .then(data => {
                handleDisApprove(ind);
            })
    }




    return (
        <div classNameName="App">
            {console.log(labInfo)}
            <h2>Staff Application Requests</h2>
            {(docInfo.length > 0) ?
                docInfo.map((element, index) => {
                    return (<div className="apply-div" >
                        <span>  {element.name} </span>
                        <span> {element.specialization} </span>
                        <span> {element.phone}</span>
                        <button onClick={() => handleClick(element.senderId, index)} disabled={approvalStatus[index]} className="approve" > {approvalStatus[index] ? 'Approved' : 'Approve'}</button>
                        <button onClick={() => handleRejectClick(element.senderId, index)} disabled={disapprovalStatus[index]} className="approve" > {disapprovalStatus[index] ? 'Rejected' : 'Reject'}</button>

                    </div>

                    )
                }) : <h2><strong>No doc Requests</strong></h2>}

            <br />
            <h2>Lab Requests</h2>
            {(labInfo.length > 0) ?
                labInfo.map((element, index) => {
                    return (<div className="apply-div" style={{ backgroundColor: "cyan" }}>
                        <span>  {element.patientName} </span>
                        <span> {element.description} </span>
                        <span> {element.doctorName}</span>
                        <button onClick={() => handlelabClick(element.labreqId, index)} disabled={approvallabStatus[index]} className="approve" >{approvallabStatus[index] ? 'Approved' : 'Approve'}</button>
                        <button onClick={() => handleRejectLabClick(element.labreqId, index)} disabled={disapprovallabStatus[index]} className="reject" >{disapprovallabStatus[index] ? 'Rejected' : 'Reject'}</button>

                    </div>


                    )
                }) : <h2><strong>No Lab Requests</strong></h2>}

        </div>
    );
}

export default Admin;