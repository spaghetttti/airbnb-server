import { Router } from 'express';
import { rentalController } from '../controllers/rentalController';
const rentalRouter = Router();

// Define rental routes without the /rentals prefix
rentalRouter.get('/', rentalController.getAllRentals);
rentalRouter.get('/location/:id', rentalController.getRentalByLocationId);
rentalRouter.get('/property/:id', rentalController.getRentalByPropertyId);
rentalRouter.post('/', rentalController.createRental);
rentalRouter.put('/:id', rentalController.updateRental);
rentalRouter.delete('/:id', rentalController.deleteRental);

export default rentalRouter;
