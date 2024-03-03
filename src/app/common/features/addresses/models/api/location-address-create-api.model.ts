export interface LocationAddressCreateApiModel {
  country: string;
  name: string;
  line1: string;
  line2: string;
  postalcode: string;
  stateOrProvince: string;
  addressId?: string;
  locality: string;
  status?: string;
  district?: string;
  subdistrict?: string;
  isResidential?: boolean;
  addLocations?: boolean;
  __metadata: any;
}
