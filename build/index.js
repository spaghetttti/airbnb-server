"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const database_1 = __importDefault(require("./services/database"));
const body_parser_1 = __importDefault(require("body-parser"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const rentalRoutes_1 = __importDefault(require("./routes/rentalRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use(body_parser_1.default.json());
app.get("/test-users", async (req, res) => {
    const pool = await (0, database_1.default)();
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM users");
    res.send(rows);
    connection.release();
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/properties', propertyRoutes_1.default);
app.use('/api/rentals', rentalRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//! 
// const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// // Create a MySQL connection pool
// const pool = mysql.createPool({
//   host: DBconfig.MYSQL_ADDON_HOST,
//   user: DBconfig.MYSQL_ADDON_USER,
//   password: DBconfig.MYSQL_ADDON_PASSWORD,
//   database:DBconfig.MYSQL_ADDON_DB,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
// // Test the database connection
// pool.getConnection((err: any, connection: any) => {
//   if (err) {
//     console.error('Error connecting to the database: ' + err);
//     return;
//   }
//   console.log('Connected to the database!');
//   connection.release();
// });
// app.get('/lol', (re: any, res: any) => {
//   // Query the database
//   pool.query('SELECT * FROM Users', (err: any, results: any) => {
//     if (err) {
//       console.error('Error performing the query: ' + err);
//       return;
//     }
//     res.json(results);
//   });
// });
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
