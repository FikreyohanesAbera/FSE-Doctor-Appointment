const db = require("../routes/db-config");
const patientsService = require("./user.service");
const createDoctor = async (doctor) => {
  console.log("here is the doctor",doctor);
  const user = await patientsService.getUser(doctor.userId, "user");
  console.log("user", user, typeof(doctor));
  const duplicate = await patientsService.getUser(doctor.userId, "doctor");


  const { startTime, endTime, department } = doctor;
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM doctors WHERE email= ?",
      [user.email],
      (err, result) => {
        if (err) reject(err);
        if (result.length > 0) {
          console.log("the duplicate doctor", result);
          resolve(result[0]);
        } else {
          console.log("iiiiiiiiiiiiiiiiiiiiiiiiii", endTime, startTime,department)
          db.query(
            "INSERT INTO doctors SET ?",
            {
              firstName: user.firstName,
              lastName: user.lastName,
              fromTime: startTime,
              toTime: endTime,
              specialization: department,
              phone: user.phone,
              email: user.email,
              password: user.password,
            },
            (err, result) => {
              if(err) console.log(err);
              if (err) reject(err);
              resolve(result);
            }
          );
          
        }
      }
    );
  });
};

const updateDoctor = (id, doctor) => {
  const { name, email, specialty } = doctor;
  return new Promise((resolve, reject) => {
    const query = `UPDATE doctors SET name='${name}', email='${email}', specialty='${specialty}' WHERE id=${id}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getDoctor = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM doctors WHERE id=${id}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

const getDoctors = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM doctors`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      console.log("all the doctors ", result)
      resolve(result);
    });
  });
};


const deleteDoctor = (doctor) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM doctors WHERE id=${doctor.id}`;
    console.log("deleteing", doctor)
    db.query(query, (err, result) => {
      if (err) reject(err);
      console.log("delete result", result)
      resolve(result);
    });
  });
};

module.exports = {
  createDoctor,
  updateDoctor,
  getDoctor,
  getDoctors,
  deleteDoctor,
};
