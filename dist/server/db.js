"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
// Import path module
const path = require('path');
// Get the location of database.sqlite file
const dbPath = path.resolve('/tmp/db/opportunity.sqlite');
let db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    }
    else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`, (err) => {
            if (err) {
                // Table already created
            }
            else {
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
                db.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
                db.run(insert, ["user", "user@example.com", md5("user123456")]);
            }
        });
    }
});
exports.db = db;
//# sourceMappingURL=db.js.map