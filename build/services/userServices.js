"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const userModel_1 = require("../models/userModel");
exports.userService = {
    getAllUsers: async () => {
        try {
            return await userModel_1.userModel.getAllUsers();
        }
        catch (error) {
            throw new Error('Error retrieving users' + error);
        }
    },
    getUserById: (userId) => {
        return userModel_1.userModel.getUserById(userId);
    },
    createUser: (user) => {
        return userModel_1.userModel.createUser(user);
    },
    updateUser: (userId, userData) => {
        return userModel_1.userModel.updateUser(userId, userData);
    },
    deleteUser: async (userId) => {
        try {
            return await userModel_1.userModel.deleteUser(userId);
        }
        catch (error) {
            throw new Error('Error retrieving user for deleting');
        }
    },
};
