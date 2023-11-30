"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const propertyController_1 = require("../controllers/propertyController");
const propertyRouter = express_1.default.Router();
// Define property routes
propertyRouter.get('', propertyController_1.propertyController.getAllProperties);
propertyRouter.get('/:id', propertyController_1.propertyController.getPropertyById);
propertyRouter.post('', propertyController_1.propertyController.createProperty);
propertyRouter.put('/:id', propertyController_1.propertyController.updateProperty);
propertyRouter.delete('/:id', propertyController_1.propertyController.deleteProperty);
exports.default = propertyRouter;
