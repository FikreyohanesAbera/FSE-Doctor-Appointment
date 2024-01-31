


const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const loggedIn = require("./loggedin");


const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post("/findadoc",(req,res) => {
    if (!req.body.searchValue){
        db.query('SELECT * FROM doctors ORDER BY id FETCH NEXT 10 ROWS ONLY',(err,results) => {
            if (err) throw err;
            return res.json(results);
        });

    }
    const searchValue = req.body.searchValue  + '%';
    db.query('SELECT * from doctors WHERE name LIKE ? OR specialization LIKE ?', [searchValue,searchValue] ,(err, resultss) => {
        if (err) throw err;
        return res.json(resultss);        
    });
})




module.exports = router;


