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
      if(err)console.log(err)
      if (err) reject(err);

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
      "SELECT * from users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.log(err)
          reject(err);
          return;
        }

        if (!results || results.length === 0) {
          // No user found with the provided email
          if (password !== passwordConfirm) {
            resolve(false); // Passwords don't match
          } else {
            resolve(true); // No existing user with the provided email and passwords match
          }
        } else {
          // User with the same email already exists
          resolve(false);
        }
      }
    );
  });
};


const createAndSignIn = async (userAccount) => {
  const savedUser = await userService.createUser(userAccount);
  const token = createToken({ user: userAccount.firstName, id: savedUser[0].id, role: "user" });
  return { token, user: savedUser };
};

module.exports = {
  verifySignUp,
  verifyLogin,
  createToken,
  verifyToken,
  createAndSignIn,
};
