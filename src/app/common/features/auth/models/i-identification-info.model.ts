/* eslint-disable @typescript-eslint/naming-convention */
export interface IIdentificationInfoModel {
  IDCARD: string;
  SELFIE: string;
  IDCARD_KK?: string;
  KTP: string;
  KK?: string;

  maidenName?: string;

  birthDate?: string;
  nationality?: string;
  placeOfBirth?: string;

  country?: string;
  stateOrProvince?: string;
  locality?: string;
  streetAddress?: string;
  postalCode?: string;
  district: string;
  subdistrict: string;

  mobilePhone?: string;
}
