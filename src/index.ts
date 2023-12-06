import express, { Request, Response } from "express";
import userRouter from "./routes/userRoutes";
import connectToDatabase from "./services/database";
import bodyParser from "body-parser";
import propertyRouter from "./routes/propertyRoutes";
import rentalRouter from "./routes/rentalRoutes";
const cors = require('cors');


// Enable CORS for all routes


const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use(cors());
app.use(express.json())

app.use(bodyParser.json())

app.get("/test-users",  async (req: Request, res: Response) => {
  const pool : any = await connectToDatabase();
  const connection = await pool.getConnection();
  const [rows]:any = await connection.query("SELECT * FROM users");
  res.send(rows);
  connection.release();
});

app.use('/api/users', userRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/rentals', rentalRouter);



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
