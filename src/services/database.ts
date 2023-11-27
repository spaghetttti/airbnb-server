import mysql from 'mysql2/promise';
import { DBconfig } from "../config/db.config";

async function connectToDatabase() {
  try {
    const pool = mysql.createPool({
      host: DBconfig.MYSQL_ADDON_HOST,
      user: DBconfig.MYSQL_ADDON_USER,
      password: DBconfig.MYSQL_ADDON_PASSWORD,
      database: DBconfig.MYSQL_ADDON_DB
    });
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

//     const DATABASE_URL='mysql://u8cg5p90hd50m9nt:7CCXVFjbEAGwFb7bermF@bhobuo3elequsu8qehbi-mysql.services.clever-cloud.com:3306/bhobuo3elequsu8qehbi'


// async function connectToDatabaseWithURI() {
//   try {
//     const connection = await mysql.createConnection(DATABASE_URL);
//     console.log('Connected to MySQL database! with uri');
//     connection.end(); // Close the connection
//     return connection;
//   } catch (error) {
//     console.error('Error connecting to database: uri connection failed too', error);
//     throw new Error('Database connection failed uri connection failed too');
//   }
// }

// export default connectToDatabaseWithURI;