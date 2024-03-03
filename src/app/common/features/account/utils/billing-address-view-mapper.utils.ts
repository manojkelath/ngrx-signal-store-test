import { BillingAddressApiModel } from '@features/account/models/api';
import { BillingAddressViewModel } from '@features/account/models/view';

export const billingAddressViewMapperUtil = (address: BillingAddressApiModel): BillingAddressViewModel => ({
  country: address.$country,
  line1: address.line1,
  locality: address.locality,
  stateOrProvince: address.$stateOrProvince,
  postalcode: address.postalcode,
});
