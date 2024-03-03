import { AddressLocationApiModel } from './address-location-api.model';

export interface AddressLocationResponseApiModel {
  $locationType: string;
  address: AddressLocationApiModel;
  locationId: string;
  locationType: string;
  name: string;
  ownerId: string;
  worHoursPerWeek: number;
  __metadata: {
    access: Record<string, string>;
    displayName: string;
    id: string;
    type: string;
  };
}
