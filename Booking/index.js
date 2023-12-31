const express = require('express');
const db = require("./routes/db-config");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const app = express();
app.use("/js",express.static(__dirname + "/public/js"));
app.use("/css",express.static(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());
app.use(express.json());

db.connect(err => {
    if (err) throw err;
    console.log("db created successfully");
})

app.use("/",require("./routes/pages"));
app.use("/api",require("./controllers/auth.js"));
app.use("/",require("./controllers/apply"));
app.use("/",require("./controllers/book"));



app.listen(port, function() {
    console.log("app running on port 3000");
})