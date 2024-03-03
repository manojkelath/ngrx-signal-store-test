import { AddressCreateEditFromControlNameEnum } from '@features/addresses/enums';

export const USER_IDENTIFICATION_ADDRESS_CUSTOM_CONTROLS = [
  'streetAddress',
  AddressCreateEditFromControlNameEnum.SUBDISTRICT,
  AddressCreateEditFromControlNameEnum.PROVINCE,
  AddressCreateEditFromControlNameEnum.DISTRICT,
  AddressCreateEditFromControlNameEnum.CITY,
  AddressCreateEditFromControlNameEnum.POSTAL_CODE,
];
