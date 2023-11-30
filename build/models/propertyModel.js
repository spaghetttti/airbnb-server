"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyModel = void 0;
const database_1 = __importDefault(require("../services/database"));
exports.propertyModel = {
    getAllProperties: async () => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const [rows] = await connection.query("SELECT * FROM Properties");
            connection.release();
            return rows;
        }
        catch (error) {
            throw new Error("Error retrieving properties");
        }
    },
    getSearchedProperties: async (searchData) => {
        const { numberOfRooms, numberOfBeds, desiredTown, desiredPrice, desiredStartDate, desiredEndDate,
        // ... other search criteria from propertySearchData
         } = searchData;
        try {
            // Construct the SQL query
            const query = `
        SELECT *
        FROM properties p
        JOIN rooms r ON p.property_id = r.property_id
        WHERE p.town = ?
          AND r.number_of_rooms >= ?
          AND r.number_of_beds >= ?
          AND p.price <= ?
          AND p.property_id NOT IN (
            SELECT property_id
            FROM rentals
            WHERE (date_start BETWEEN ? AND ?)
              OR (date_end BETWEEN ? AND ?)
          )
      `;
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            // Execute the query with parameters
            const [rows] = await connection.query(query, [
                desiredTown,
                numberOfRooms,
                numberOfBeds,
                desiredPrice,
                desiredStartDate,
                desiredEndDate,
                desiredStartDate,
                desiredEndDate,
            ]);
            return rows;
        }
        catch (error) {
            throw new Error('Error searching for properties');
        }
    },
    // getSearchedProperties: async (searchData: any): Promise<any> => { 
    //   try {
    //     const pool = await connectToDatabase();
    //     const connection = await pool.getConnection();
    //     const [rows] = await connection.query("SELECT * FROM Properties WHERE ?", [searchData]);
    //     connection.release();
    //     return rows as any[];
    //   } catch (error) {
    //     throw new Error("Error retrieving properties");
    //   }
    // } ,
    getPropertyById: async (propertyId) => {
        console.log(propertyId);
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const [property] = await connection.query("SELECT * FROM Properties WHERE id_property = ?", [propertyId]);
            connection.release();
            return property;
        }
        catch (error) {
            throw new Error("Error retrieving property by ID");
        }
    },
    createProperty: async (property) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const result = await connection.query("INSERT INTO Properties SET ?", property);
            connection.release();
            return result;
        }
        catch (error) {
            throw new Error("Error creating property");
        }
    },
    updateProperty: async (propertyId, propertyData) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const result = await connection.query("UPDATE Properties SET ? WHERE id_property = ?", [propertyData, propertyId]);
            connection.release();
            return result;
        }
        catch (error) {
            throw new Error("Error updating property");
        }
    },
    deleteProperty: async (propertyId) => {
        try {
            const pool = await (0, database_1.default)();
            const connection = await pool.getConnection();
            const result = await connection.query("DELETE FROM Properties WHERE id_property = ?", [propertyId]);
            connection.release();
            return result;
        }
        catch (error) {
            throw new Error("Error deleting property");
        }
    },
};
