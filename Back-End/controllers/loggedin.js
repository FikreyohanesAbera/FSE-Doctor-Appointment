const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const loggedIn = async (req,res,next) => {
    if (req.body.token) {
        try {
            const decoded = await jwt.verify(
                req.body.token.split("=")[1],
                process.env.JWT_SECRET
              );

            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (err) {
            return next();
        }
    } else {
        next();
    }

}

module.exports = loggedIn;