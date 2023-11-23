import { rentalModel, IRental } from "../models/rentalModel";

export const rentalService = {
  getAllRentals: async (): Promise<any[]> => {
    try {
      return await rentalModel.getAllRentals();
    } catch (error) {
      throw new Error('Error retrieving rentals');
    }
  },

  getRentalById: async (rentalId: number): Promise<any> => {
    try {
      return await rentalModel.getRentalById(rentalId);
    } catch (error) {
      throw new Error('Error retrieving rental by ID');
    }
  },

  createRental: async (rental: IRental): Promise<any> => {
    try {
      return await rentalModel.createRental(rental);
    } catch (error) {
      throw new Error('Error creating rental' + error);
    }
  },

  updateRental: async (rentalId: number, rentalData: IRental): Promise<any> => {
    try {
      return await rentalModel.updateRental(rentalId, rentalData);
    } catch (error) {
      throw new Error('Error updating rental');
    }
  },

  deleteRental: async (rentalId: number): Promise<any> => {
    try {
      return await rentalModel.deleteRental(rentalId);
    } catch (error) {
      throw new Error('Error deleting rental');
    }
  },
};
