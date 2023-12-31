import connectToDatabase from "../services/database";

export interface IUser {
  name: string;
  email: string;
  last_name: string;
  phone_number: string;
  password: string;
}

export const userModel = {
  getAllUsers: async (): Promise<any[]> => {
    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
      const [rows] = await connection.query("SELECT * FROM Users");
      connection.release();
      return rows as any;
    } catch (error) {
      throw new Error("Error retrieving users" + error);
    }
  },

  getUserById: async (userId: number): Promise<any> => {
    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
      const [user] = await connection.query(
        "SELECT * FROM Users WHERE id = ?",
        [userId]
      );
      connection.release();
      return user as any;
    } catch (error) {
      throw new Error("Error retrieving user by ID");
    }
  },

  getUserByEmail: async (userEmail: string): Promise<any> => {
    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
      const [user] = await connection.query(
        "SELECT * FROM Users WHERE email = ?",
        [userEmail]
      );
      connection.release();
      return user as any;
    } catch (error) {
      throw new Error("Error retrieving user by email" + error);
    }
  },

  createUser: async (user: IUser): Promise<any> => {
    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
      const result = await connection.query("INSERT INTO Users SET ?", user);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error creating user" + error);
    }
  },

  updateUser: async (userId: number, userData: IUser): Promise<any> => {
    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();

      const result = await connection.query("UPDATE Users SET ? WHERE id = ?", [
        userData,
        userId,
      ]);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error updating user");
    }
  },

  deleteUser: async (userId: number): Promise<any> => {
    try {
      const connection = await connectToDatabase();
      // const connection = await pool.getConnection();
      const result = await connection.query("DELETE FROM Users WHERE id = ?", [
        userId,
      ]);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error deleting user");
    }
  },
};
