// src/services/userService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import { IUser } from "../models/userModel";
import { userModel } from "../models/userModel";
export const userService = {
  registerUser: async (userData: IUser) => {
    const { password } = userData;
    const hashedPassword: string = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    return userModel.createUser(userData);
  },

  loginUser: async (email: string, password: string) => {
    try {
      const users = await userModel.getUserByEmail(email);
      const user = users[0];
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (password !== user.password && !passwordMatch) {
        throw new Error("Incorrect password" + passwordMatch);
      }
      return "user is chill " + passwordMatch + user.email + user.password;
    } catch (error) {
      throw new Error("shit happened somewhere here" + error);
    }
    //
    // // Generate JWT

    // const token = jwt.sign({ email: user.email }, "yourSecretKey", {
    //   expiresIn: "1h",
    // });

    // return token;
  },

  verifyToken: (token: any) => {
    // gogole token type later
    return jwt.verify(token, "yourSecretKey");
  },

  getAllUsers: async (): Promise<any[]> => {
    try {
      return await userModel.getAllUsers();
    } catch (error) {
      throw new Error("Error retrieving users" + error);
    }
  },

  getUserById: (userId: number) => {
    return userModel.getUserById(userId);
  },

  createUser: (user: IUser) => {
    return userModel.createUser(user);
  },

  updateUser: (userId: number, userData: IUser) => {
    return userModel.updateUser(userId, userData);
  },

  deleteUser: async (userId: number): Promise<any[]> => {
    try {
      return await userModel.deleteUser(userId);
    } catch (error) {
      throw new Error("Error retrieving user for deleting");
    }
  },
};
