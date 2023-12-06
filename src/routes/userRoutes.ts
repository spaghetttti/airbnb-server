// src/routes/userRoutes.js
const express = require('express');
import { userController } from "../controllers/userController";
import { authenticateToken } from "../controllers/userController";
const userRouter = express.Router();

// Define user routes
userRouter.get('',authenticateToken, userController.getAllUsers);
userRouter.get('/:id',authenticateToken, userController.getUserById);
userRouter.post('',authenticateToken, userController.createUser);
userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.put('/:id',authenticateToken, userController.updateUser);
userRouter.delete('/:id',authenticateToken, userController.deleteUser);

export default userRouter;