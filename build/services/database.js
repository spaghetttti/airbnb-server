"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const db_config_1 = require("../config/db.config");
async function connectToDatabase() {
    try {
        const pool = promise_1.default.createPool({
            host: db_config_1.DBconfig.MYSQL_ADDON_HOST,
            user: db_config_1.DBconfig.MYSQL_ADDON_USER,
            password: db_config_1.DBconfig.MYSQL_ADDON_PASSWORD,
            database: db_config_1.DBconfig.MYSQL_ADDON_DB
        });
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database!');
        connection.release();
        return pool;
    }
    catch (error) {
        console.error('Error connecting to database:', error);
        throw new Error('Database connection failed');
    }
}
exports.default = connectToDatabase;
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
