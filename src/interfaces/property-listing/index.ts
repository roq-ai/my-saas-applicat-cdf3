import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PropertyListingInterface {
  id?: string;
  title: string;
  address: string;
  price: number;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface PropertyListingGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  address?: string;
  organization_id?: string;
}
