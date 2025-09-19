const express = require("express");
const db = require("./routes/db-config"); // now SQLite adapter
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 3001;
const path = require("path");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY || "sk_test_dummy");
const cors = require("cors");

// CORS
const corsOptions = {
  origin: ["http://fse-doctor-appointment.onrender.com"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// --- Seed admins (same as before) ---
const admins = [
  {
    firstName: "Abebe",
    lastName: "Tilahun",
    phone: "0987654321",
    email: "abebe@gmail.com",
    password: "12345",
  },
];

const insertAdmins = async (admin) => {
  db.query("SELECT * FROM admins WHERE email = ?", [admin.email], async (err, rows) => {
    if (err) return console.error("[admins/select] error:", err);
    if (rows && rows.length >= 1) return;

    db.query(
      "INSERT INTO admins (firstName, lastName, phone, email, password) VALUES (?, ?, ?, ?, ?)",
      [
        admin.firstName,
        admin.lastName,
        admin.phone,
        admin.email,
        await bcrypt.hash(admin.password, 8),
      ],
      (err, result) => {
        if (err) return console.error("[admins/insert] error:", err);
        console.log(`Inserted ${result.affectedRows} admin row(s)`);
      }
    );
  });
};

// --- Helper: Promise wrapper for queries during init ---
const q = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, res) => (err ? reject(err) : resolve(res)));
  });

// --- Schema init for SQLite ---
async function initSchema() {
  // Users
  await q(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT
    );
  `);

  // Admins
  await q(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      phone TEXT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);

  // Applications (status ENUM -> TEXT CHECK)
  await q(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      privilege TEXT NOT NULL,
      startTime TEXT DEFAULT '8:30 AM',
      endTime  TEXT DEFAULT '05:00 PM',
      department TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','declined','accepted')),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Lab technicians
  await q(`
    CREATE TABLE IF NOT EXISTS labtechnicians (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      phone TEXT,
      department TEXT,
      email TEXT,
      password TEXT
    );
  `);

  // Doctors
  await q(`
    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      specialization TEXT,
      fromTime TEXT,
      email TEXT,
      toTime TEXT,
      phone TEXT,
      password TEXT,
      rating REAL NOT NULL DEFAULT 0.0
    );
  `);

  // Appointments (paid as INTEGER 0/1)
  await q(`
    CREATE TABLE IF NOT EXISTS appointments (
      appointmentid INTEGER PRIMARY KEY AUTOINCREMENT,
      doctorid INTEGER,
      patientid INTEGER,
      time TEXT,
      date TEXT,
      paid INTEGER NOT NULL DEFAULT 0
    );
  `);

  // Ratings
  await q(`
    CREATE TABLE IF NOT EXISTS Ratings (
      doctorid INTEGER,
      total_votes INTEGER,
      number_of_votes INTEGER
    );
  `);

  // Seed default admins
  for (const admin of admins) {
    await insertAdmins(admin);
  }
}

// --- Routes (unchanged) ---
const userController = require("./controllers/user.controller");
const doctorsController = require("./controllers/doctor.controller");
const appointmentsController = require("./controllers/appointment.controller");
const authController = require("./controllers/auth.controller");
const applicationController = require("./controllers/apply.controller");

app.use("/auth", authController);
app.use("/users", userController);
app.use("/doctors", doctorsController);
app.use("/appointments", appointmentsController);
app.use("/apply", applicationController);

app.use("/", require("./routes/pages"));
app.use("/", require("./controllers/book"));
app.use("/", require("./controllers/lab"));
app.use("/", require("./controllers/history"));

// --- Boot ---
(async () => {
  try {
    // (No real connect step needed for SQLite; keep signature for compatibility)
    db.connect(() => {});
    await initSchema();
    app.listen(port, () => {
      console.log(`app running on port ${port}`);
    });
  } catch (e) {
    console.error("[startup] failed:", e);
    process.exit(1);
  }
})();
