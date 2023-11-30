"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalService = void 0;
const rentalModel_1 = require("../models/rentalModel");
exports.rentalService = {
    getAllRentals: async () => {
        try {
            return await rentalModel_1.rentalModel.getAllRentals();
        }
        catch (error) {
            throw new Error('Error retrieving rentals');
        }
    },
    getRentalById: async (rentalId) => {
        try {
            return await rentalModel_1.rentalModel.getRentalById(rentalId);
        }
        catch (error) {
            throw new Error('Error retrieving rental by ID');
        }
    },
    createRental: async (rental) => {
        try {
            return await rentalModel_1.rentalModel.createRental(rental);
        }
        catch (error) {
            throw new Error('Error creating rental' + error);
        }
    },
    updateRental: async (rentalId, rentalData) => {
        try {
            return await rentalModel_1.rentalModel.updateRental(rentalId, rentalData);
        }
        catch (error) {
            throw new Error('Error updating rental');
        }
    },
    deleteRental: async (rentalId) => {
        try {
            return await rentalModel_1.rentalModel.deleteRental(rentalId);
        }
        catch (error) {
            throw new Error('Error deleting rental');
        }
    },
};
