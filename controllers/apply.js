
const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const moment = require("moment");
const loggedIn = require("../controllers/loggedin");

// const {getIo} = require('../routes/socket-config');



const router = express.Router();

router.use(bodyParser.urlencoded({
  extended: true
}));

// function sendNotificationForAdmin(docInfo){
//     console.log(docInfo);
//     const io = getIo();
//     io.emit('messageToAdmin', docInfo);



// }
// module.exports = {
//     sendNotificationForAdmin
//   };

router.post("/apply", loggedIn, (req, res) => {
  // io.on("connection",socket => {
  //     console.log(socket.id);
  // })
  console.log("whaaaaaaa")
  req.body.start = moment(req.body.start, "HH:mm").toISOString();
  req.body.end = moment(req.body.end, "HH:mm").toISOString();
  const docInfo = {
    name: req.body.name,
    specialization: req.body.spec,
    phone: req.body.phone,
    fromTime: req.body.start,
    toTime: req.body.end,
    senderId: req.user.id,
    RecipientId: 8

  }

  db.query('INSERT INTO doctorapply SET ?', docInfo, (err, results) => {
    if (err) throw err;
    else {
      res.json({
        status: "success",
        message: "successfully applied"
      });
    }

  })

})

router.post("/approveapply", (req, res) => {
  const docUserId = req.body.docUserId;
  db.query('SELECT * FROM doctorapply WHERE senderId = ?', [docUserId], (err, results) => {
    if (err) throw err;
    else {
      const docData = results[0];
      db.query('INSERT INTO doctors SET ?', { name: docData.name, specialization: docData.specialization, fromTime: docData.fromTime, toTime: docData.toTime, userId: docData.senderId, phone: docData.phone }, (err, resultss) => {
        if (err) throw err;
        else {
          db.query("DELETE FROM doctorapply WHERE senderId = ?", [docUserId], (err, results) => {
            if (err) throw err;
          });
          return res.json({
            status: "success"
          })



        }

      })



    }
  });

})
router.post("/rejectapply", (req, res) => {
  const docUserId = req.body.docUserId;
  console.log(docUserId);
  db.query("DELETE FROM doctorapply WHERE senderId = ?", [docUserId],(err, results) =>{
    if (err) throw err;
  });



}

)





module.exports = router;


