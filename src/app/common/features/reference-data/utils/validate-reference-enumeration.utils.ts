import { ReferenceDataConstants } from '@features/reference-data/constants';

export const validateReferenceEnumeration = (enumeration: string): string | undefined =>
  Object.values(ReferenceDataConstants).find((referenceDataConstants) => referenceDataConstants === enumeration) ||
  undefined;
