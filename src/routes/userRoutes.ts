// src/routes/userRoutes.js
const express = require('express');
import { userController } from "../controllers/userController";
const userRouter = express.Router();

// Define user routes
userRouter.get('', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;