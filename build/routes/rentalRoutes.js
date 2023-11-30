"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentalController_1 = require("../controllers/rentalController");
const rentalRouter = (0, express_1.Router)();
// Define rental routes without the /rentals prefix
rentalRouter.get('/', rentalController_1.rentalController.getAllRentals);
rentalRouter.get('/:id', rentalController_1.rentalController.getRentalById);
rentalRouter.post('/', rentalController_1.rentalController.createRental);
rentalRouter.put('/:id', rentalController_1.rentalController.updateRental);
rentalRouter.delete('/:id', rentalController_1.rentalController.deleteRental);
exports.default = rentalRouter;
