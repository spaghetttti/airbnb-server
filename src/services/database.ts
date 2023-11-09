import mysql from "mysql";
// import { dbConfig } from '../config/db.config';

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "azizbekloh",
  database: "airbnb",
});

connection.connect((error) => {
  if (error) {
    console.error("Failed to connect to MySQL:", error);
    return;
  }
  console.log("Connected to the MySQL server");
});

export default connection;
