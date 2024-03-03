export const getPhoneNumberPayload = (locationCode: string, productPhoneNumberType: string) => ({
  qualifier: locationCode,
  class: productPhoneNumberType,
});

export const getCityPayload = (provinceCode: string) => ({
  qualifier: provinceCode,
});

export const getProvincePayload = (countryCode: string) => ({
  qualifier: countryCode,
});

export const getDistrictPayload = (cityCode: string) => ({
  qualifier: cityCode,
});

export const getSubdistrictPayload = (districtCode: string) => ({
  qualifier: districtCode,
});

export const getPostalCodesPayload = (subdistrictText: string) => ({
  qualifier: subdistrictText,
});

export const getQualifierPayload = (qualifier: string) => ({
  qualifier,
});
