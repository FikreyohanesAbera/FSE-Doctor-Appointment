const db = require("../routes/db-config");
const patientsService = require("./user.service");
const createDoctor = async (doctor) => {
  const user = await patientsService.getUser(doctor.userId, "user");
  const duplicate = await patientsService.getUser(doctor.userId, "doctor");

  const { startTime, endTime, department} = doctor;
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM doctors WHERE email= ?",
      [user.email],
      (err, result) => {
        if (err) reject(err);
        if (result.length > 0) {
          resolve(result[0]);
        } else {
          db.query("SELECT id FROM users WHERE email = ?",user.email,(err,resultz) => {
            db.query(
              "INSERT INTO doctors SET ?",
              {
                firstName: user.firstName,
                lastName: user.lastName,
                fromTime: startTime,
                toTime: endTime,
                specialization: department,
                phone: "09876543",
                email: user.email,
                password: user.password,
                userId: resultz[0].id,
              },
              (err, result) => {
                if (err) reject(err);
                resolve(result);
              }
            );

          })
          
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
      resolve(result);
    });
  });
};

const deleteDoctor = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM doctors WHERE id=${id}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
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
