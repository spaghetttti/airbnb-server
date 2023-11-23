// src/services/userService.js
import { IUser } from "../models/userModel";
import { userModel } from "../models/userModel";

export const userService = {
    getAllUsers: async (): Promise<any[]> => {
        try {
          return await userModel.getAllUsers();
        } catch (error) {
          throw new Error('Error retrieving users' + error);
        }
      },

  getUserById: (userId: number) => {
    return userModel.getUserById(userId);
  },

  createUser: (user: IUser) => {
    return userModel.createUser(user);
  },

  updateUser: (userId: number, userData:IUser) => {
    return userModel.updateUser(userId, userData);
  },

  deleteUser: async (userId: number): Promise<any[]> => {
    try {
      return await userModel.deleteUser(userId);
    } catch(error) {
      throw new Error('Error retrieving user for deleting');
    }
  },
};


