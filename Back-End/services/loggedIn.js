const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
const loggedIn = async (req,res,next) => {
    if (req.body.token) {
        try {
            const decoded = await jwt.verify(
                req.body.token.split("=")[1],
                process.env.JWT_SECRET
              );
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