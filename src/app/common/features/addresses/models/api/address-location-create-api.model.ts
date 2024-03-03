import { LocationAddressCreateApiModel } from './location-address-create-api.model';

export interface AddressLocationCreateApiModel {
  address: LocationAddressCreateApiModel;
  locationType: string;
  name: string;
  parentId: string;
  __metadata: any;
}
