import { IProperty } from "../models/propertyModel";
import { propertyModel } from "../models/propertyModel";

export const propertyService = {
  getAllProperties: async (): Promise<any[]> => {
    try {
      return await propertyModel.getAllProperties();
    } catch (error) {
      throw new Error("Error retrieving properties" + error);
    }
  },
  getSearchedProperties: async (searchData: any) => { //define an interface
    try {
      return await propertyModel.getSearchedProperties(searchData);
    } catch (error) {
      throw new Error("Error retrieving properties" + error);
    }
  },
  getPropertyById: (propertyId: number) => {
    return propertyModel.getPropertyById(propertyId);
  },

  createProperty: (property: IProperty) => {
    return propertyModel.createProperty(property);
  },

  updateProperty: (propertyId: number, propertyData: IProperty) => {
    return propertyModel.updateProperty(propertyId, propertyData);
  },

  deleteProperty: async (propertyId: number): Promise<any[]> => {
    try {
      return await propertyModel.deleteProperty(propertyId);
    } catch (error) {
      throw new Error("Error deleting property");
    }
  },
};
