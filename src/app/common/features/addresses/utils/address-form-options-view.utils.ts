import { ADDRESS_OPTION_KEY_DIVIDER } from '@features/addresses/constants';

export const createOptionKeyWithValue = (key: string, value: string): string =>
  `${key}${ADDRESS_OPTION_KEY_DIVIDER}${value}`;

export const getOptionValue = (key: string): string => {
  const keyArr = (key || '')?.split(ADDRESS_OPTION_KEY_DIVIDER);

  return keyArr.length > 1 ? keyArr[1] : '';
};

export const getOptionKey = (key: string): string => {
  const keyArr = (key || '')?.split(ADDRESS_OPTION_KEY_DIVIDER);

  return keyArr.length > 1 ? keyArr[0] : '';
};
