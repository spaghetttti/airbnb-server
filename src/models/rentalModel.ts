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

  getRentalByLocationId: async (rentalId: number): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const [rows] = await connection.query("SELECT * FROM Rentals WHERE id_location = ?", [rentalId]);
      connection.release();
      return rows as any[];
    } catch (error) {
      throw new Error("Error retrieving rental by location ID");
    }
  },

  getRentalByPropertyId: async (propertyId: number): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const [rows] = await connection.query("SELECT * FROM Rentals WHERE id_property = ?", [propertyId]);
      console.log(rows);
      
      connection.release();
      return rows as any[];
    } catch (error) {
      throw new Error("Error retrieving rental by property ID");
    }
  },

  createRental: async (rental: IRental, propertyId: number): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      
      // Check for overlapping rentals
      const overlapQuery = `
        SELECT *
        FROM Rentals
        WHERE id_property = ? AND (
          (date_start <= ? AND date_end >= ?)
          OR (date_start <= ? AND date_end >= ?)
          OR (date_start >= ? AND date_end <= ?)
        )`;
  
      const [overlappingRentals] = await connection.query(overlapQuery, [
        propertyId,
        rental.date_start,
        rental.date_end,
        rental.date_start,
        rental.date_end,
        rental.date_start,
        rental.date_end,
      ]);
  
      if ((overlappingRentals as any[]).length > 0) {
        // Handle overlapping rentals
        // You might throw an error or handle it based on your app's logic
        throw new Error("There is an overlapping rental for this property.");
      }
  
      // Proceed with inserting the rental if there's no overlap
      const result = await connection.query("INSERT INTO Rentals SET ?", rental);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error creating rental: " + error);
    }
  },
  

  updateRental: async (rentalId: number, rentalData: IRental): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
  
      // Retrieve property ID for the rental being updated
      const [propertyIdRow]: any[] = await connection.query("SELECT id_property FROM Rentals WHERE id_location = ?", rentalId);
      const propertyId = propertyIdRow[0]?.id_property;
      console.log('modelview', rentalData);
      
      if (!propertyId) {
        throw new Error("Property ID not found for the rental");
      }
  
      // Check for overlapping rentals
      const overlapQuery = `
        SELECT *
        FROM Rentals
        WHERE id_property = ? AND id_location <> ? AND (
          (date_start <= ? AND date_end >= ?)
          OR (date_start <= ? AND date_end >= ?)
          OR (date_start >= ? AND date_end <= ?)
        )`;
  
      const [overlappingRentals] = await connection.query(overlapQuery, [
        propertyId,
        rentalId,
        rentalData.date_start,
        rentalData.date_end,
        rentalData.date_start,
        rentalData.date_end,
        rentalData.date_start,
        rentalData.date_end,
      ]);
  
      if ((overlappingRentals as any[]).length > 0) {
        // Handle overlapping rentals
        throw new Error("There is an overlapping rental for this property.");
      }
  
      // Proceed with updating the rental if there's no overlap
      const result = await connection.query("UPDATE Rentals SET ? WHERE id_location = ?", [rentalData, rentalId]);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error updating rental: " + error);
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
