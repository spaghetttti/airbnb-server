import { propertyService } from "../services/propertyServices";
import { Request, Response } from 'express';

export const propertyController = {
  getAllProperties: async (req: Request, res: Response): Promise<void> => {
    const searchData = req.query;
    console.log(searchData);
    
    try {
      if (Object.keys(searchData).length > 0) {
        
        const properties = await propertyService.getSearchedProperties(searchData);
        res.status(200).json(properties);

      } else {
        console.log('uncheck');

        const properties = await propertyService.getAllProperties();
        res.status(200).json(properties);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' + error});
    }
  },

  getPropertyById: async (req: Request, res: Response): Promise<void> => {
    const propertyId = req.params.id.slice(1);

    try {
      const property = await propertyService.getPropertyById(Number(propertyId));
      if (!property) {
        res.status(404).json({ error: 'Property not found' });
        return;
      }

      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createProperty: async (req: Request, res: Response): Promise<void> => {
    const newProperty = req.body;
    console.log(newProperty);
    
    try {
      await propertyService.createProperty(newProperty);
      res.status(201).json({ message: 'Property created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' + error });
    }
  },

  updateProperty: async (req: Request, res: Response): Promise<void> => {
    const propertyId = req.params.id.slice(1);
    const propertyData = req.body;

    try {
      await propertyService.updateProperty(Number(propertyId), propertyData);
      res.status(200).json({ message: 'Property updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteProperty: async (req: Request, res: Response): Promise<void> => {
    const propertyId = req.params.id.slice(1);
    
    try {
      await propertyService.deleteProperty(Number(propertyId));
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
