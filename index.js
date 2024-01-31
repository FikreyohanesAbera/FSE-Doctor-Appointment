const express = require('express');
const db = require("./routes/db-config");
const { initializeWebSocket, getIo } = require('./routes/socket-config.js'); 
const {sendNotificationForAdmin} = require('./controllers/apply.js');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
const app = express();

const server = require('http').createServer(app);

initializeWebSocket(server);
const cors=require("cors");
const corsOptions ={
   origin: ['http://localhost:3000','http://localhost:5173'], 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use("/js",express.static(__dirname + "/public/js"));
// app.use("/css",express.static(__dirname + "/public/css"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());
app.use(express.json());

db.connect(err => {
    if (err) throw err;
    console.log("db created successfully");
})


app.use("/",require("./routes/pages"));
app.use("/",require("./controllers/auth.js"));
app.use("/",require("./controllers/apply"));
app.use("/",require("./controllers/book"));
app.use("/",require("./controllers/displaydoc"));
app.use("/",require("./controllers/findadoc"));
app.use("/",require("./controllers/lab"));
app.use("/",require("./controllers/history"));







server.listen(port, function() {
    console.log("app running on port 8000");
})