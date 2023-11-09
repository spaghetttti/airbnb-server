import { Request, Response } from 'express';
import connection from '../services/database';

export const getUsers = (req: Request, res: Response) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    return res.json(results);
  });
};
