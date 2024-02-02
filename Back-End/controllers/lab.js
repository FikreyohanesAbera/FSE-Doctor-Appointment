const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const loggedIn = require("./loggedin");
const jwt = require("jsonwebtoken");
const multer = require('multer')
const path = require('path')

const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post("/labrequest", loggedIn, (req, res) => {
    let userId;
    let docName;

    console.log("in handler labrequest","labrequest", req.body, req.user)
    db.query('SELECT id FROM users WHERE email = ?', [req.body.email], async  (err, results) => {
        if (err) throw err;
        else {
            userId = results[0].id;
            if (req.cookies.token) { 
                    const decoded = await jwt.verify(
                        req.cookies.token,
                        process.env.JWT_SECRET
                      );
                      console.log("hit get patient controller", decoded.id, decoded);
                      const id = decoded.id;
                    
            db.query('SELECT firstName,lastName FROM doctors WHERE id  = ?', [decoded.id], (err, results) => {

                if (err) throw err;
                else {
                    docName = results[0].firstName + results[0].lastName;
                    db.query('INSERT INTO labrequest SET ?', { userId: userId, doctorId: decoded.id, description: req.body.desc, adminId: 8, doctorName: docName, status: "pending", labTechName: req.body.name }, (err, resultss) => {
                        if (err) throw err;
                        else {
                            res.status(200).json({
                                status: "success",
                            })


                        }

                    })



                }
            })
        }
        }
    })




})

router.post("/labTechReq",loggedIn, (req, res) => {
    console.log(req.body)
    let labreqId = req.body.labreqId; 

        db.query("UPDATE labrequest SET status = ?  WHERE labreqId = ?", ["accepted", labreqId], (err, innerresults) => {
            if (err) throw err;
        })
    })

router.post("/rejectlabapply",(req,res)=>{
    console.log("called")
    db.query("UPDATE labrequest SET status = ?  WHERE labreqId = ?", ["rejected", req.body.labreqId], (err, innerresults) => {
        if (err) throw err;
    })

})
router.post("/checkup",loggedIn,(req,res) => {
    console.log(req.body.date)
    db.query('INSERT INTO checkups SET ?',{
        doctorId: req.user.id,
        patientEmail: req.body.email,
        description: req.body.desc,
        date: req.body.date

    },(err) => {
        if (err) throw err;
        res.json({
            status: "success"
        })
    }
        )
})

router.post("/labdocresult",loggedIn,(req,res) => {
    db.query("SELECT email FROM users WHERE id = ?",req.user.id,(err,results) => {
        console.log(results[0].email)
        db.query("SELECT filepath FROM labtest WHERE doctorEmail = ?",results[0].email,(error,resultz) => {
            console.log(resultz.length)
            if (error) throw error;
            if (resultz.length > 0){
                return res.json({
                    filePath: resultz[0].filepath
                })

            }
            else{
                return res.json({
                    filePath: ''
                })
            }


        })

    })
    
});


router.post("/labresult",loggedIn,(req,res) => { 
    console.log("in/labresult")
    db.query("SELECT email FROM users WHERE id = ?",req.user.id,(err,results) => { 
        db.query("SELECT filepath FROM labtest WHERE patientEmail = ?",results[0].email,(error,resultz) => { 
            console.log(resultz.length)

            if (error) throw error; 
            if (resultz.length > 0){ 
                return res.json({ 
                    filePath: resultz[0].filepath 
                }) 
 
            } 
            else{ 
                return res.json({ 
                    filePath: '' 
                }) 
            } 
        }) 
 
    }) 
     
});

  const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
      const uploadDir = path.join(__dirname, '../../uploads'); 
      cb(null, uploadDir); 
    }, 
    filename: (req, file, cb) => { 
      const ext = path.extname(file.originalname); 
      cb(null, `${Date.now()}${ext}`); 
    }, 
  }); 
   
  const upload = multer({ storage: storage }); 
  router.post('/labtest', upload.single('file'), (req, res) => { 
    console.log("In /labtest")
      if (!req.file) { 
        return res.status(400).json({ error: 'No file uploaded' }); 
      } 
     
      const { patientEmail, doctorName } = req.body; 
      const filePath = req.file.path; 
     
      const insertQuery = 'INSERT INTO labtest (patientEmail, doctorEmail, filepath) VALUES (?, ?, ?)'; 
      const values = [patientEmail, doctorName, filePath]; 
     
      db.query(insertQuery, values, (err, results) => { 
        if (err) { 
          console.error('Error inserting data into database:', err); 
          return res.status(500).json({ error: 'Internal Server Error' }); 
        } 
     
        return res.status(201).json({ message: 'File uploaded and data stored successfully' }); 
      }); 
    });

    router.get('/download/:filename', (req, res) => { 
        console.log("in /download" )

        const filename = req.params.filename; 
        console.log(filename)
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`); 
        res.setHeader('Content-Type', 'application/pdf');  
       
      });
    
module.exports = router;


