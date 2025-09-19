// Back-End/routes/db-config.js
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const dataDir = path.join(__dirname, "..", "data");
fs.mkdirSync(dataDir, { recursive: true });
const dbFile = path.join(dataDir, "efoyta.sqlite");

// Open (or create) the DB file immediately
const _conn = new sqlite3.Database(dbFile, (err) => {
  if (err) console.error("[sqlite/open] error:", err);
});

// Enable foreign keys
_conn.run("PRAGMA foreign_keys = ON");

// (No-op) to mimic mysql.connect(cb)
function connect(cb) {
  if (cb) cb(null);
}

// Close DB
function end(cb) {
  _conn.close((err) => {
    if (cb) cb(err);
  });
}

// MySQL-like query signature: query(sql, params?, cb)
function query(sql, params, cb) {
  if (typeof params === "function") {
    cb = params;
    params = [];
  }
  params = params || [];

  const head = sql.trim().slice(0, 6).toUpperCase();
  const isSelect = head === "SELECT" || sql.trim().toUpperCase().startsWith("PRAGMA");

  if (isSelect) {
    _conn.all(sql, params, (err, rows) => {
      if (cb) cb(err, rows || []);
    });
  } else {
    _conn.run(sql, params, function (err) {
      if (cb) {
        cb(err, { affectedRows: this?.changes ?? 0, insertId: this?.lastID ?? 0 });
      }
    });
  }
}

module.exports = { connect, query, end };
