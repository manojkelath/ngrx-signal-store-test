import { ADDRESS_NAME_DIVIDER_API } from '@features/addresses/constants';
import { AddressNameCodesViewModel } from '@features/addresses/models/view';

export const mapAddressNameApi = (
  cityCode: string,
  districtCode: string,
  subdistrictCode: string,
  postalCode: string
): string =>
  `${cityCode}${ADDRESS_NAME_DIVIDER_API}${districtCode}${ADDRESS_NAME_DIVIDER_API}${subdistrictCode}${ADDRESS_NAME_DIVIDER_API}${postalCode}`;

export const parseAddressNameAPI = (name: string): AddressNameCodesViewModel => {
  const valuesArray = name.split(ADDRESS_NAME_DIVIDER_API);

  return {
    city: valuesArray[0],
    district: valuesArray[1],
    subdistrict: valuesArray[2],
    postalCode: valuesArray[3],
  };
};
