import { AddressTypeEnum } from '@features/addresses/enums';

export interface AddressAPIModel {
  $country: string;
  $stateOrProvince: string;
  addressId: string;
  name: string;
  addressType: AddressTypeEnum;
  country: string;
  line1: string;
  locality: string;
  postalcode: string;
  district: string;
  subdistrict: string;
  stateOrProvince: string;
  __metadata: any;
}
