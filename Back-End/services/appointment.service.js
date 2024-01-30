const db = require('../routes/db-config');

const bookAppointment = async (req, res) => {
  const inputTime = moment(req.body.time, "HH:mm").toISOString();
  const compareTime = new Date(inputTime).getTime();
  let validApp = true;

  const checkAppointments = await getAppointments(req.body.doctorid);

  if (checkAppointments.length > 0) {
      checkAppointments.forEach(result => {
          const dbTime = new Date(result.time).getTime();
          const dbDate = result.date;
          const diff = (compareTime - dbTime) / 60_000;
          if (dbDate === req.body.date && Math.abs(diff) < 30) {
              validApp = false;
          }
      });
  }

  if (!validApp) {
      console.log("date reason");
      res.redirect("/book?error=AppointmentUnavailable");
  } else {
      const doctorSchedule = await getDoctorSchedule(req.body.doctorid);
      const finishTime = new Date(doctorSchedule[0].toTime).getTime();
      finishTime /= 60_000;
      finishTime -= 30;
      const starting = new Date(doctorSchedule[0].fromTime).getTime();
      starting /= 60_000;
      compareTime /= 60_000;

      if ((starting > compareTime) && (compareTime <= finishTime)) {
          const newAppointment = {
              doctorid: Number(req.body.doctorid),
              patientid: 1,
              time: inputTime,
              date: req.body.date
          };
          await insertAppointment(newAppointment);
          return newAppointment
      } else {
          console.log("time reason");
          return []
          // res.redirect("/book?error=AppointmentUnavailable");
      }
  }
};

const getAppointments = async (doctorid) => {
  const query = 'SELECT time,date from appointments WHERE doctorid = ?';
  const results = await executeQuery(query, [doctorid]);
  return results;
};

const getDoctorSchedule = async (doctorid) => {
  const query = 'SELECT fromTime,toTime from doctors WHERE id = ?';
  const results = await executeQuery(query, [doctorid]);
  return results;
};

const insertAppointment = async (newAppointment) => {
  const query = 'INSERT INTO appointments SET ?';
  await executeQuery(query, [newAppointment]);
};

const executeQuery = async (query, values) => {
  return new Promise((resolve, reject) => {
      db.query(query, values, (err, results) => {
          if (err) reject(err);
          else resolve(results);
      });
  });
};

const createAppointment = (appointment) => {
  const { time, date } = appointment;
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO appointments (doctorid, patientid, time, date) VALUES (${1}, ${1}, '${time}', '${date}')`;

    db.query(query,  (err, result) => {
      if (err) {
        console.log("err")
        if (err.code === 'ER_DUP_ENTRY') {
          reject(new Error('This appointment time is already taken'));
        } else {
          reject(err);
        }
      } else {
        resolve(result);
      }
    });
  });
};
const updateAppointment = (appointment) => {
    const { id, doctorId, patientId, startTime, endTime } = appointment;
    return new Promise((resolve, reject) => {
      const query = `UPDATE appointments SET doctor_id = ${doctorId}, patient_id = ${patientId}, start_time = '${startTime}', end_time = '${endTime}' WHERE id = ${id}`;
      db.query(query, (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            reject(new Error('This appointment time is already taken'));
          } else {
            reject(err);
          }
        } else {
          resolve(result);
        }
      });
    });
  };
  
const getAppointmentsByDoctorId = (doctorId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM appointments WHERE doctor_id = ${doctorId}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getAppointmentsByPatientId = (patientId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM appointments WHERE patient_id = ${patientId}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const deleteAppointment = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM appointments WHERE id = ${id}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {

  bookAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  updateAppointment,
  deleteAppointment
};