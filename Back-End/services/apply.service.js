const db = require('../routes/db-config');
  const createApplication = (application, userId) => {
    let { privilege, startTime, endTime, department, specialization} = application;
    console.log("id", userId, department, specialization, startTime, endTime)
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM applications WHERE userId= ?', [userId], (err, result) => {
        if (err) reject(err);
        if(result.length > 0){ 
          console.log("the duplicate" ,result)
          resolve(result[0]);

        }
        else {
          if (startTime == "") startTime = "8:00 PM"
          if (endTime == "") endTime = "5:00 PM"
          db.query(
            "INSERT INTO applications SET ?",{ userId: userId, privilege: privilege, startTime: startTime , endTime: endTime, department:  department ?? specialization },(err, result) => {
              if (err) {
                console.log("err inserting");
                  reject(err);
              } else {
                resolve(result);
              }
            }
          );
          }});
    })
  }

  const getApplications = () => {
    return new Promise((resolve, reject) => {
    db.query('SELECT * FROM applications', (err, result) => {
      if (err) reject(err);
      else{
        console.log('the applications', result)
      }
      resolve(result);
    })
  })
  }

  const updateApplications = (id, status) =>{
    return new Promise((resolve, reject) => {
      db.query('UPDATE applications SET status = ? WHERE id = ?',[status, id], (err, result) => {
        if (err) reject(err);
        else{
          console.log('the applications', result)
        }
        resolve(result);
      })
    })
  }

  module.exports = {
    createApplication,
    updateApplications,
    getApplications,
  }