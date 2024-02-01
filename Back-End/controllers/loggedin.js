const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const loggedIn = async (req,res,next) => {
    console.log("uffff" + req.cookies.token); 
    if (req.cookies.token) {
        try {
            // req.body.token.split("=")[1],
            const decoded = await jwt.verify(
                req.cookies.token,
                
                process.env.JWT_SECRET
              );
            console.log(decoded, "just here");
            const table = decoded.role + 's'

            db.query(`SELECT * FROM ${table} WHERE id = ?`, [decoded.id], (err, results) => {
                if (!results) {
                    console.log("here")
                    return next();
                }
                console.log("here", results[0])
                req.user = results[0];
                return next();
            });
        } catch (err) {
            console.log(err)
            return next();
        }
    } else {
        console.log("noooooooooooooo")
        next();
    }

}

module.exports = loggedIn;