"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalController = void 0;
const rentalServices_1 = require("../services/rentalServices");
exports.rentalController = {
    getAllRentals: async (req, res) => {
        try {
            const rentals = await rentalServices_1.rentalService.getAllRentals();
            res.status(200).json(rentals);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getRentalById: async (req, res) => {
        const rentalId = req.params.id.slice(1);
        try {
            const rental = await rentalServices_1.rentalService.getRentalById(Number(rentalId));
            if (!rental[0]) {
                res.status(404).json({ error: 'Rental not found' });
                return;
            }
            res.status(200).json(rental[0]);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createRental: async (req, res) => {
        const newRental = req.body;
        try {
            await rentalServices_1.rentalService.createRental(newRental);
            res.status(201).json({ message: 'Rental created successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' + error });
        }
    },
    updateRental: async (req, res) => {
        const rentalId = req.params.id.slice(1);
        const rentalData = req.body;
        try {
            await rentalServices_1.rentalService.updateRental(Number(rentalId), rentalData);
            res.status(200).json({ message: 'Rental updated successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    deleteRental: async (req, res) => {
        const rentalId = req.params.id.slice(1);
        try {
            await rentalServices_1.rentalService.deleteRental(Number(rentalId));
            res.status(200).json({ message: 'Rental deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
