import { AddressLocationCreateApiModel } from './address-location-create-api.model';

export interface AddressCreateApiModel {
  locationRequest: {
    location: Partial<AddressLocationCreateApiModel>;
    partyRoleId: string;
    __metadata?: any;
  };
}
