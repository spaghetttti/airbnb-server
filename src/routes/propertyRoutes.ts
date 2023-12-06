import express from 'express';
import {propertyController} from '../controllers/propertyController';
const propertyRouter = express.Router();

// Define property routes
propertyRouter.get('', propertyController.getAllProperties);
propertyRouter.get('/:id', propertyController.getPropertyById);
propertyRouter.post('', propertyController.createProperty);
propertyRouter.put('/:id', propertyController.updateProperty);
propertyRouter.delete('/:id', propertyController.deleteProperty);

export default propertyRouter;
 