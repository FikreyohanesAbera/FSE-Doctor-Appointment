const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
const loggedIn = async (req,res,next) => {
    console.log("In logged in") 
    if (req.cookies.token) {
        try {
            const decoded = await jwt.verify(
                req.cookies.token,
                process.env.JWT_SECRET
              );
              console.log("hit get patient controller", decoded.id, decoded);
              const id = decoded.id;

            db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (err) {
            console.log(err)
            return next();
        }
    } else {
        next();
    }

}

module.exports = loggedIn;