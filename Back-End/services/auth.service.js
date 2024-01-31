const jwt = require("jsonwebtoken");
const userService = require("./user.service");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyLogin = (role, email, password) => {
  const table = role + "s";
  const query = `SELECT * FROM ${table} WHERE email = ?`;
  const value = [email];
  return new Promise((resolve, reject) => {
    db.query(query, value, async (err, results) => {
      if (err) reject(err);
      console.log("db", table, results);
      if (results != undefined && results.length >= 1) {
        if (
          !results ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          resolve(false);
        } else {
          resolve({ id: results[0].id, role: role });
        }
      }
      resolve(false);
    });
  });
};

const verifySignUp = (email, password, passwordConfirm) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT email from users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) reject(err);
        if(!results) {
          
          console.log(results,email, "results undefined");
          
          resolve(true)
        } else if (results.length > 0) {
          console.log("results, with same email", results);
          resolve(false);
        } else if (password != passwordConfirm) {
          console.log("different password", password, passwordConfirm);
          resolve(false);
        } else resolve(true);
        
      }
    );
  });
};

const createAndSignIn = async (userAccount) => {
  console.log("creating user cookie", userAccount);
  const savedUser = await userService.createUser(userAccount);
  console.log("saved user", savedUser)
  const token = createToken({ user: userAccount.firstName, id: savedUser[0].id, role: "user" });
  console.log("created", savedUser, token);
  return { token, user: savedUser };
};

module.exports = {
  verifySignUp,
  verifyLogin,
  createToken,
  verifyToken,
  createAndSignIn,
};
