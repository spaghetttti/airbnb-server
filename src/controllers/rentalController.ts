import { rentalService } from "../services/rentalServices";
import { Request, Response } from 'express';

export const rentalController = {
  getAllRentals: async (req: Request, res: Response): Promise<void> => {
    try {
      const rentals = await rentalService.getAllRentals();
      res.status(200).json(rentals);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getRentalById: async (req: Request, res: Response): Promise<void> => {
    const rentalId = req.params.id.slice(1);

    try {
      const rental = await rentalService.getRentalById(Number(rentalId));
      if (!rental[0]) {
        res.status(404).json({ error: 'Rental not found' });
        return;
      }

      res.status(200).json(rental[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createRental: async (req: Request, res: Response): Promise<void> => {
    const newRental = req.body;
    
    try {
      await rentalService.createRental(newRental);
      res.status(201).json({ message: 'Rental created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' + error});
    }
  },

  updateRental: async (req: Request, res: Response): Promise<void> => {
    const rentalId = req.params.id.slice(1);
    const rentalData = req.body;

    try {
      await rentalService.updateRental(Number(rentalId), rentalData);
      res.status(200).json({ message: 'Rental updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteRental: async (req: Request, res: Response): Promise<void> => {
    const rentalId = req.params.id.slice(1);
    
    try {
      await rentalService.deleteRental(Number(rentalId));
      res.status(200).json({ message: 'Rental deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
