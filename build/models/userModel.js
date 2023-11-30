"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const database_1 = __importDefault(require("../services/database"));
exports.userModel = {
    getAllUsers: async () => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const [rows] = await connection.query("SELECT * FROM Users");
            connection.release();
            return rows;
        }
        catch (error) {
            throw new Error("Error retrieving users" + error);
        }
    },
    getUserById: async (userId) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const [user] = await connection.query("SELECT * FROM Users WHERE id = ?", [userId]);
            connection.release();
            return user;
        }
        catch (error) {
            throw new Error("Error retrieving user by ID");
        }
    },
    createUser: async (user) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            console.log(user);
            const result = await connection.query("INSERT INTO Users SET ?", user);
            connection.release();
            return result;
        }
        catch (error) {
            throw new Error("Error creating user");
        }
    },
    updateUser: async (userId, userData) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const result = await connection.query("UPDATE Users SET ? WHERE id = ?", [userData, userId]);
            connection.release();
            return result;
        }
        catch (error) {
            throw new Error("Error updating user");
        }
    },
    deleteUser: async (userId) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const result = await connection.query("DELETE FROM Users WHERE id = ?", [userId]);
            connection.release();
            return result;
        }
        catch (error) {
            throw new Error("Error deleting user");
        }
    },
};
