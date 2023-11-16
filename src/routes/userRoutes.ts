// src/routes/userRoutes.js
const express = require('express');
import { userController } from "../controllers/userController";
const userRouter = express.Router();

// Define user routes
userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:id', userController.getUserById);
userRouter.post('/users', userController.createUser);
userRouter.put('/users/:id', userController.updateUser);
userRouter.delete('/users/:id', userController.deleteUser);

export default userRouter;