"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalModel = void 0;
const database_1 = __importDefault(require("../services/database"));
exports.rentalModel = {
    getAllRentals: async () => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const [rows] = await connection.query("SELECT * FROM Rentals");
            connection.release();
            return rows;
        }
        catch (error) {
            throw new Error("Error retrieving rentals");
        }
    },
    getRentalById: async (rentalId) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const [rental] = await connection.query("SELECT * FROM Rentals WHERE id_location = ?", [rentalId]);
            connection.release();
            return rental;
        }
        catch (error) {
            throw new Error("Error retrieving rental by ID");
        }
    },
    createRental: async (rental) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const result = await connection.query("INSERT INTO Rentals SET ?", rental);
            connection.release();
            return result;
        }
        catch (error) {
            throw new Error("Error creating rental" + error);
        }
    },
    updateRental: async (rentalId, rentalData) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const result = await connection.query("UPDATE Rentals SET ? WHERE id_location = ?", [rentalData, rentalId]);
            connection.release();
            return result;
        }
        catch (error) {
            throw new Error("Error updating rental");
        }
    },
    deleteRental: async (rentalId) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const result = await connection.query("DELETE FROM Rentals WHERE id_location = ?", [rentalId]);
            connection.release();
            return result;
        }
        catch (error) {
            throw new Error("Error deleting rental");
        }
    },
};
