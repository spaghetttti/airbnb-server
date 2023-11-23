// src/controllers/userController.js
import { userService } from "../services/userServices";
import { Request, Response } from 'express';

export const userController = {
  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' + error});
    }
  },

  getUserById: async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id.slice(1);

    try {
      const user = await userService.getUserById(Number(userId));
      if (!user[0]) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', userId: userId });
    }
  },

  createUser: async (req: Request, res: Response): Promise<void> => {
    const newUser = req.body;
    console.log('newUser', req.params, req.body);
    
    try {
      await userService.createUser(newUser);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateUser: async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id.slice(1);
    const userData = req.body;

    try {
      await userService.updateUser(Number(userId), userData);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.id.slice(1);
    
    try {
      console.log(await userService.deleteUser(Number(userId)));
      
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error: ' + error});
    }
  },
};
