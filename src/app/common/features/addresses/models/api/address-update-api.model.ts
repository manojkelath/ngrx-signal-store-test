import { AddressLocationUpdateApiModel } from './address-location-update-api.model';

export interface AddressUpdateApiModel {
  locationRequest: {
    location: AddressLocationUpdateApiModel;
    partyRoleId: string;
    __metadata: any;
  };
}
