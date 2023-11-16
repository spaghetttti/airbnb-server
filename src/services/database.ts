import mysql from 'mysql2/promise';
import { DBconfig } from "../config/db.config";

async function connectToDatabase() {
  try {
    const pool = mysql.createPool(DBconfig);

    const connection = await pool.getConnection();
    console.log('Connected to MySQL database!');
    connection.release();
    return pool;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Database connection failed');
  }
}

export default connectToDatabase;
