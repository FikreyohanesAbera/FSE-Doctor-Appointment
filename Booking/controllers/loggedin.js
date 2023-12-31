const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
const loggedIn = async (req,res,next) => {
    if (req.cookies.userSave) {
        try {
            const decoded = await jwt.verify(req.cookies.userSave,
                process.env.JWT_SECRET
            );
            console.log(decoded);

            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
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