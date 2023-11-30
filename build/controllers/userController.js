"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
// src/controllers/userController.js
const userServices_1 = require("../services/userServices");
exports.userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userServices_1.userService.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' + error });
        }
    },
    getUserById: async (req, res) => {
        const userId = req.params.id.slice(1);
        try {
            const user = await userServices_1.userService.getUserById(Number(userId));
            if (!user[0]) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user[0]);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error', userId: userId });
        }
    },
    createUser: async (req, res) => {
        const newUser = req.body;
        console.log('newUser', req.params, req.body);
        try {
            await userServices_1.userService.createUser(newUser);
            res.status(201).json({ message: 'User created successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    updateUser: async (req, res) => {
        const userId = req.params.id.slice(1);
        const userData = req.body;
        try {
            await userServices_1.userService.updateUser(Number(userId), userData);
            res.status(200).json({ message: 'User updated successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteUser: async (req, res) => {
        const userId = req.params.id.slice(1);
        try {
            console.log(await userServices_1.userService.deleteUser(Number(userId)));
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error: ' + error });
        }
    },
};
