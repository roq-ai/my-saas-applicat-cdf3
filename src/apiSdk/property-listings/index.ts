import axios from 'axios';
import queryString from 'query-string';
import { PropertyListingInterface, PropertyListingGetQueryInterface } from 'interfaces/property-listing';
import { GetQueryInterface } from '../../interfaces';

export const getPropertyListings = async (query?: PropertyListingGetQueryInterface) => {
  const response = await axios.get(`/api/property-listings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPropertyListing = async (propertyListing: PropertyListingInterface) => {
  const response = await axios.post('/api/property-listings', propertyListing);
  return response.data;
};

export const updatePropertyListingById = async (id: string, propertyListing: PropertyListingInterface) => {
  const response = await axios.put(`/api/property-listings/${id}`, propertyListing);
  return response.data;
};

export const getPropertyListingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/property-listings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePropertyListingById = async (id: string) => {
  const response = await axios.delete(`/api/property-listings/${id}`);
  return response.data;
};
