const db = require('../routes/db-config');
const bcrypt = require("bcryptjs");

const createUser = async (User) => {
  // console.log(User, "creating User")

  const { firstName, lastName, email, password, phone } = User;
  let hashedPassword = await bcrypt.hash(password, 8);
  
  return new Promise((resolve, reject) => {
    
    db.query('INSERT INTO users SET ?', { firstName: firstName, lastName: lastName, email: email, phone: phone, password: hashedPassword }, (err, result) => {
      if (err) reject(err);
      const query = `SELECT * FROM Users WHERE email= ?`;
      db.query(query,[email], (err, result) => {
        if (err) reject(err);
        // console.log("result of createUser", result[0])

        resolve(result);
      });
      
      // resolve(result)
     
    });
  });
};

const updateUser = (id, User) => {
  const { name, email, age, gender } = User;
  return new Promise((resolve, reject) => {
    const query = `UPDATE users SET name='${name}', email='${email}', age=${age}, gender='${gender}' WHERE id=${id}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getUser = (id, role) => {
  const table = role + 's'
  
  const query = `SELECT * FROM ${table} WHERE id = ?`
  return new Promise((resolve, reject) => {
    const value = [id]
    db.query(query, value, async (err, result) => {
      if (err) reject(err);
      // console.log("getting User by id",table, id, result)
      if(result) resolve(result[0]);
      else resolve(null)       

    });

  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Users`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM Users WHERE id=${id}`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser
};