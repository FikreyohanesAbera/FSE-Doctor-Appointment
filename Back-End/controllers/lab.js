


const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const loggedIn = require("./loggedin");
const multer = require('multer');
const path = require("path");

const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post("/labrequest", loggedIn, (req, res) => {
    let userId;
    let docName;
    db.query('SELECT id FROM users WHERE email = ?', [req.body.email], (err, results) => {
        if (err) throw err;
        else {
            userId = results[0].id;
            db.query('SELECT firstName,lastName FROM doctors WHERE id  = ?', [req.user.id], (err, results) => {

                if (err) throw err;
                else {
                    docName = results[0].firstName + results[0].lastName;
                    db.query('INSERT INTO labrequest SET ?', { userId: userId, doctorId: req.user.id, description: req.body.desc, adminId: 8, doctorName: docName, status: "pending", labTechName: req.body.name }, (err, resultss) => {
                        if (err) throw err;
                        else {
                            res.json({
                                status: "success",
                            })


                        }

                    })



                }
            })
        }
    })




})

router.post("/labTechReq", loggedIn, (req, res) => {
    let labreqId = req.body.labreqId;

    db.query("UPDATE labrequest SET status = ?  WHERE labreqId = ?", ["approved", labreqId], (err, innerresults) => {
        if (err) throw err;
    })
})

router.post("/rejectlabapply", (req, res) => {
    db.query("UPDATE labrequest SET status = ?  WHERE labreqId = ?", ["rejected", req.body.labreqId], (err, innerresults) => {
        if (err) throw err;
    })

})
router.post("/checkup", loggedIn, (req, res) => {
    db.query('INSERT INTO checkups SET ?', {
        doctorId: req.user.id,
        patientEmail: req.body.email,
        description: req.body.desc,
        date: req.body.date

    }, (err) => {
        if (err) throw err;
        res.json({ status: "success" })
    }
    )
})
// router.post('/labtest', (req, res) => {
//     const { fileName, description } = req.body;

//     // Insert data into MySQL
//     const sql = 'INSERT INTO labtest (fileName, description) VALUES (?, ?)';
//     db.query(sql, [fileName, description], (err, result) => {
//         if (err) {
//             console.error('Error inserting data into MySQL:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             console.log('Data inserted into MySQL:', result);
//             res.status(200).json({ message: 'Form submitted successfully' });
//         }
//     });
// });

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
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const { patientEmail, doctorName } = req.body;
    const filePath = req.file.path;
  
    // Insert data into the database
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
  

  
//   // Express middleware for handling file uploads
//   router.post('/labtest', upload.single('file'), (req, res) => {
//     const { patientName, doctorName } = req.body;
//     const filePath = req.file.path;
  
//     // Insert data into the database
//     const insertQuery = 'INSERT INTO labtest (patientName, doctorName, filePath) VALUES (?, ?, ?)';
//     const values = [patientName, doctorName, filePath];
  
//     db.query(insertQuery, values, (err, results) => {
//       if (err) {
//         console.error('Error inserting data into database:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
  
//       return res.status(201).json({ message: 'File uploaded and data stored successfully' });
//     });
//   });

router.post("/labresult",loggedIn,(req,res) => {
    db.query("SELECT email FROM users WHERE id = ?",req.user.id,(err,results) => {
        db.query("SELECT filepath FROM labtest WHERE patientEmail = ?",results[0].email,(error,resultz) => {
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
router.post("/labdocresult",loggedIn,(req,res) => {
    db.query("SELECT email FROM users WHERE id = ?",req.user.id,(err,results) => {
        db.query("SELECT filepath FROM labtest WHERE doctorEmail = ?",results[0].email,(error,resultz) => {
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

router.get('/download/:filename', (req, res) => {

  const filename = req.params.filename;
  const filePath = path.join(filename);

  // Set appropriate headers for the download
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'application/pdf'); // Adjust content type based on your file type

  // Send the file
});
module.exports = router;


