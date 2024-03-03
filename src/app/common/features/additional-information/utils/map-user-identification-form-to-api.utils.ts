import { USER_IDENTIFICATION_ADDRESS_CUSTOM_CONTROLS } from '@features/additional-information/constants';
import { AddressCreateEditFromControlNameEnum } from '@features/addresses/enums';
import { getOptionValue } from '@features/addresses/utils';

export const mapUserIdentificationFormToAPI = (formRawValue: any): any => {
  let result = {};
  for (const controlName in formRawValue) {
    if (USER_IDENTIFICATION_ADDRESS_CUSTOM_CONTROLS.includes(controlName)) {
      const { prop, value } = mapUserIdentificationFormValueNameToAPI(controlName, formRawValue[controlName]);
      if (!prop) {
        continue;
      }
      result = { ...result, [prop]: value };
    } else {
      result = { ...result, [controlName]: formRawValue[controlName] };
    }
  }

  return result;
};

export const mapUserIdentificationFormValueNameToAPI = (name, value): Partial<{ prop: string; value: string }> => {
  switch (name) {
    case 'streetAddress':
      return { prop: 'streetAddress', value };
    case AddressCreateEditFromControlNameEnum.SUBDISTRICT:
      return { prop: 'subdistrict', value: getOptionValue(value) };
    case AddressCreateEditFromControlNameEnum.PROVINCE:
      return { prop: 'stateOrProvince', value };
    case AddressCreateEditFromControlNameEnum.DISTRICT:
      return { prop: 'district', value: getOptionValue(value) };
    case AddressCreateEditFromControlNameEnum.CITY:
      return { prop: 'locality', value: getOptionValue(value) };
    case AddressCreateEditFromControlNameEnum.POSTAL_CODE:
      return { prop: 'postalCode', value: getOptionValue(value) || value };
    default:
      return {};
  }
};
