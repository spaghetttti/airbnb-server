"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.js
const express = require('express');
const userController_1 = require("../controllers/userController");
const userRouter = express.Router();
// Define user routes
userRouter.get('', userController_1.userController.getAllUsers);
userRouter.get('/:id', userController_1.userController.getUserById);
userRouter.post('', userController_1.userController.createUser);
userRouter.put('/:id', userController_1.userController.updateUser);
userRouter.delete('/:id', userController_1.userController.deleteUser);
exports.default = userRouter;
