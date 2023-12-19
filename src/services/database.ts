import mysql from "mysql2/promise";
import { DBconfig } from "../config/db.config";

async function connectToDatabase() {
  try {
    // const pool = mysql.createPool({
    //   host: DBconfig.MYSQL_ADDON_HOST,
    //   user: DBconfig.MYSQL_ADDON_USER,
    //   password: DBconfig.MYSQL_ADDON_PASSWORD,
    //   database: DBconfig.MYSQL_ADDON_DB
    // });
    const pool = mysql.createPool({
      host: DBconfig.MYSQL_LOCAL_HOST,
      user: DBconfig.MYSQL_LOCAL_USER,
      password: DBconfig.MYSQL_LOCAL_PASSWORD,
      database: DBconfig.MYSQL_LOCAL_DB,
    });
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database!");
    connection.release();
    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Database connection failed");
  }
}

export default connectToDatabase;
