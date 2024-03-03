export interface BillingAddressApiModel {
  addressId: string;
  addressType: string;
  $country: string;
  line1: string;
  locality: string;
  $stateOrProvince: string;
  postalcode: string;
}
