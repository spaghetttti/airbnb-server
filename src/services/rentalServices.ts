import { rentalModel, IRental } from "../models/rentalModel";

export const rentalService = {
  getAllRentals: async (): Promise<any[]> => {
    try {
      return await rentalModel.getAllRentals();
    } catch (error) {
      throw new Error('Error retrieving rentals');
    }
  },

  getRentalByLocationId: async (rentalId: number): Promise<any> => {
    try {
      return await rentalModel.getRentalByLocationId(rentalId);
    } catch (error) {
      throw new Error('Error retrieving rental by ID');
    }
  },

  getRentalByPropertyId: async (propertyId: number): Promise<any> => {
    try {
      return await rentalModel.getRentalByPropertyId(propertyId);
    } catch (error) {
      throw new Error('Error retrieving rental by ID');
    }
  },

  createRental: async (rental: IRental, propertyId: number): Promise<any> => {
    try {
      return await rentalModel.createRental(rental, propertyId);
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
