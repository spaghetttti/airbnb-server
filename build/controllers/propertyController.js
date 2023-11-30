"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyController = void 0;
const propertyServices_1 = require("../services/propertyServices");
exports.propertyController = {
    getAllProperties: async (req, res) => {
        const searchData = req.body;
        console.log(searchData);
        try {
            if (Object.keys(searchData).length > 0) {
                console.log('check');
                const properties = await propertyServices_1.propertyService.getSearchedProperties(searchData);
                res.status(200).json(properties);
            }
            else {
                console.log('uncheck');
                const properties = await propertyServices_1.propertyService.getAllProperties();
                res.status(200).json(properties);
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getPropertyById: async (req, res) => {
        const propertyId = req.params.id.slice(1);
        try {
            const property = await propertyServices_1.propertyService.getPropertyById(Number(propertyId));
            if (!property) {
                res.status(404).json({ error: 'Property not found' });
                return;
            }
            res.status(200).json(property);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createProperty: async (req, res) => {
        const newProperty = req.body;
        try {
            await propertyServices_1.propertyService.createProperty(newProperty);
            res.status(201).json({ message: 'Property created successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' + error });
        }
    },
    updateProperty: async (req, res) => {
        const propertyId = req.params.id.slice(1);
        const propertyData = req.body;
        try {
            await propertyServices_1.propertyService.updateProperty(Number(propertyId), propertyData);
            res.status(200).json({ message: 'Property updated successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteProperty: async (req, res) => {
        const propertyId = req.params.id.slice(1);
        try {
            await propertyServices_1.propertyService.deleteProperty(Number(propertyId));
            res.status(200).json({ message: 'Property deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
