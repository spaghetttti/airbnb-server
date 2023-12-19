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
  image_url: string;
}

export interface ISearchData {
  date_start?: string;
  date_end?: string;
  town?: string;
  price?: string;
  rooms_number?: string;
  beds_number?: string;
  distance?: string;
}

export const propertyModel = {
  getAllProperties: async (): Promise<any[]> => {
    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
      const [rows] = await connection.query("SELECT * FROM Properties");
      connection.release();
      return rows as any[];
    } catch (error) {
      throw new Error("Error retrieving properties");
    }
  },

  getSearchedProperties: async (searchData: ISearchData): Promise<any[]> => {
    const { rooms_number, beds_number, town, price, date_start, date_end, distance } =
      searchData;

    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();

      let query = `
        SELECT *
        FROM Properties p
        WHERE 1 = 1`; // Default condition to start the WHERE clause
      const queryParams: string[] = [];

      // Build the query conditionally based on available search parameters
      if (town) {
        query += ` AND p.town = ?`;
        queryParams.push(town);
      }
      if (rooms_number) {
        query += ` AND p.rooms_number >= ?`;
        queryParams.push(rooms_number);
      }
      if (beds_number) {
        query += ` AND p.beds_number >= ?`;
        queryParams.push(beds_number);
      }
      if (price) {
        query += ` AND p.price <= ?`;
        queryParams.push(price);
      }

      if (distance) {
        query += ` AND p.distance <= ?`;
        queryParams.push(distance);
      }

      if (date_start && date_end) {
        query += `
          AND p.id_property NOT IN (
            SELECT r.id_property
            FROM Rentals r
            WHERE (r.date_start BETWEEN ? AND ?)
              OR (r.date_end BETWEEN ? AND ?)
          )`;
        queryParams.push(date_start, date_end, date_start, date_end);
      }

      // Execute the query with parameters
      const [rows] = await connection.query(query, queryParams);

      return rows as any[];
    } catch (error) {
      throw new Error("Error searching for properties" + error);
    }
  },

  getPropertyById: async (propertyId: number): Promise<any> => {
    console.log(propertyId);

    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
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
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
      const result = await connection.query(
        "INSERT INTO Properties SET ?",
        property
      );
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error creating property" + error);
    }
  },

  updateProperty: async (
    propertyId: number,
    propertyData: IProperty
  ): Promise<any> => {
    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
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
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
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
