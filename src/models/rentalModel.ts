import connectToDatabase from "../services/database";

export interface IRental {
  id_location?: number;
  id_property: number;
  email_renter: string;
  date_start: string; // Change these to match your date format
  date_end: string;
  review: string;
}

export const rentalModel = {
  getAllRentals: async (): Promise<any[]> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const [rows] = await connection.query("SELECT * FROM Rentals");
      connection.release();
      return rows as any[];
    } catch (error) {
      throw new Error("Error retrieving rentals");
    }
  },

  getRentalById: async (rentalId: number): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const [rental] = await connection.query("SELECT * FROM Rentals WHERE id_location = ?", [rentalId]);
      connection.release();
      return rental as any;
    } catch (error) {
      throw new Error("Error retrieving rental by ID");
    }
  },

  createRental: async (rental: IRental): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const result = await connection.query("INSERT INTO Rentals SET ?", rental);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error creating rental" + error);
    }
  },

  updateRental: async (rentalId: number, rentalData: IRental): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const result = await connection.query("UPDATE Rentals SET ? WHERE id_location = ?", [rentalData, rentalId]);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error updating rental");
    }
  },

  deleteRental: async (rentalId: number): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const result = await connection.query("DELETE FROM Rentals WHERE id_location = ?", [rentalId]);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error deleting rental");
    }
  },
};
