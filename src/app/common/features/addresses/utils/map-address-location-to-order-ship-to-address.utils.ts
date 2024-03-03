import { AddressLocationResponseApiModel } from '@features/addresses/models/api';

export const mapAddressLocationToOrderShipToAddress = (shipToAddressApi: AddressLocationResponseApiModel): any => ({
  ...shipToAddressApi?.address,
});
