import { Router } from 'express';
import { rentalController } from '../controllers/rentalController';
const rentalRouter = Router();

// Define rental routes without the /rentals prefix
rentalRouter.get('/', rentalController.getAllRentals);
rentalRouter.get('/:id', rentalController.getRentalById);
rentalRouter.post('/', rentalController.createRental);
rentalRouter.put('/:id', rentalController.updateRental);
rentalRouter.delete('/:id', rentalController.deleteRental);

export default rentalRouter;
