"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyService = void 0;
const propertyModel_1 = require("../models/propertyModel");
exports.propertyService = {
    getAllProperties: async () => {
        try {
            return await propertyModel_1.propertyModel.getAllProperties();
        }
        catch (error) {
            throw new Error("Error retrieving properties");
        }
    },
    getSearchedProperties: async (searchData) => {
        try {
            return await propertyModel_1.propertyModel.getSearchedProperties(searchData);
        }
        catch (error) {
            throw new Error("Error retrieving properties");
        }
    },
    getPropertyById: (propertyId) => {
        return propertyModel_1.propertyModel.getPropertyById(propertyId);
    },
    createProperty: (property) => {
        return propertyModel_1.propertyModel.createProperty(property);
    },
    updateProperty: (propertyId, propertyData) => {
        return propertyModel_1.propertyModel.updateProperty(propertyId, propertyData);
    },
    deleteProperty: async (propertyId) => {
        try {
            return await propertyModel_1.propertyModel.deleteProperty(propertyId);
        }
        catch (error) {
            throw new Error("Error deleting property");
        }
    },
};
