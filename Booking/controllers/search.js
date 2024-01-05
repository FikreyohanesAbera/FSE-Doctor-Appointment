const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const path = require('path');
const router = express.Router();
router.use(express.json());
router.use(bodyParser.urlencoded({
    extended: true
  }));

router.get('/doctors', (req,res) => {
  const query = req.query.q;
  var sql = `SELECT * FROM doctors WHERE firstName LIKE '%${query}%' OR lastName LIKE '%${query}%' OR specialization LIKE '%${query}%'`
  db.query(sql, (err, results) =>{
      if(err) throw err;
      else if (results){
        console.log(results)
        res.send(results)
      }
  })
})


module.exports = router;