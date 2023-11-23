import connectToDatabase from "../services/database";

export interface IProperty {
  id_property?: number;
  email_proprietor: string;
  town: string;
  street: string;
  code: string;
  beds_number: number;
  rooms_number: number;
  distance: number;
  price: number;
}

export const propertyModel = {
  getAllProperties: async (): Promise<any[]> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const [rows] = await connection.query("SELECT * FROM Properties");
      connection.release();
      return rows as any[];
    } catch (error) {
      throw new Error("Error retrieving properties");
    }
  },

  getPropertyById: async (propertyId: number): Promise<any> => {
    console.log(propertyId);

    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const [property] = await connection.query(
        "SELECT * FROM Properties WHERE id_property = ?",
        [propertyId]
      );
      connection.release();
      return property as any;
    } catch (error) {
      throw new Error("Error retrieving property by ID");
    }
  },

  createProperty: async (property: IProperty): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const result = await connection.query(
        "INSERT INTO Properties SET ?",
        property
      );
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error creating property");
    }
  },

  updateProperty: async (
    propertyId: number,
    propertyData: IProperty
  ): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const result = await connection.query(
        "UPDATE Properties SET ? WHERE id_property = ?",
        [propertyData, propertyId]
      );
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error updating property");
    }
  },

  deleteProperty: async (propertyId: number): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const result = await connection.query(
        "DELETE FROM Properties WHERE id_property = ?",
        [propertyId]
      );
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error deleting property");
    }
  },
};
