import connectToDatabase from "../services/database";

export interface IUser {
  name: string;
  email: string;
  last_name: string;
  phone_number: string;
}

export const userModel = {
  getAllUsers: async (): Promise<any[]> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const [rows] = await connection.query("SELECT * FROM users");
      connection.release();
      return rows as any;
    } catch (error) {
      throw new Error("Error retrieving users");
    }
  },

  getUserById: async (userId: number): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const [user] = await connection.query("SELECT * FROM users WHERE id = ?", [userId]);
      connection.release();
      return user as any;
    } catch (error) {
      throw new Error("Error retrieving user by ID");
    }
  },

  createUser: async (user: IUser): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      console.log(user);

      const result = await connection.query("INSERT INTO users SET ?", user);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error creating user");
    }
  },

  updateUser: async (userId: number, userData: IUser): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      
      const result = await connection.query("UPDATE users SET ? WHERE id = ?", [userData, userId]);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error updating user");
    }
  },

  deleteUser: async (userId: number): Promise<any> => {
    try {
      const pool = await connectToDatabase();
      const connection = await pool.getConnection();
      const result = await connection.query("DELETE FROM users WHERE id = ?", [userId]);
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error deleting user");
    }
  },
};
