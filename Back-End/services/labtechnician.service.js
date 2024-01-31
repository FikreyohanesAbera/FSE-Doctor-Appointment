const db = require("../routes/db-config");
const patientsService = require("./user.service");
const createLabTechnician = async (labtechnician) => {
  //   const {  start, end } = labtechnician;
  const labtech = await patientsService.getUser(
    labtechnician.userId,
    "user"
  );
  return new Promise((resolve, reject) => {
    
    console.log("lab tech to be created", labtech);
    db.query(
      "SELECT * FROM labtechnicians WHERE email= ?",
      [labtech.email],
      (err, result) => {
        if (err) reject(err);
        console.log("result", result)
        if (result.length > 0) {
          console.log("the duplicate labtech", result);
          resolve(result[0]);
        } else {
          db.query(
            "INSERT INTO labtechnicians SET ?",
            {
              firstName: labtech.firstName,
              lastName: labtech.lastName,
              email: labtech.email,
              password: labtech.password,
              phone: labtech.phone,
              department: labtechnician.department,
            },
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          );
        }
      }
    );
    
  });
};

// const updateLabtechnician = (id, labtechnician) => {
//   const { name, email, specialty } = labtechnician;
//   return new Promise((resolve, reject) => {
//     const query = `UPDATE labtechnicians SET name='${name}', email='${email}', specialty='${specialty}' WHERE id=${id}`;
//     db.query(query, (err, result) => {
//       if (err) reject(err);
//       resolve(result);
//     });
//   });
// };

const getLabTechnician = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM labtechnicians WHERE id=${id}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

const getLabTechnicians = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM labtechnicians`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
const deleteLabTechnician = (labtech) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM labtechnicians WHERE id=${labtech.id}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  createLabTechnician,
  getLabTechnician,
  getLabTechnicians,
  deleteLabTechnician,
};
