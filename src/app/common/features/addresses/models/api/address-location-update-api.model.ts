import { LocationAddressCreateApiModel } from '@features/addresses/models/api';

export interface AddressLocationUpdateApiModel {
  address: LocationAddressCreateApiModel;
  locationType: string;
  name: string;
  ownerId: string;
  locationId: string;
  __metadata: any;
}
