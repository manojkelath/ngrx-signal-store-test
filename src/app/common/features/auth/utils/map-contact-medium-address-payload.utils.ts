import { IIdentificationInfoModel } from '@features/auth/models';

export const mapContactMediumAddressPayload = (partyRoleId: string, data: IIdentificationInfoModel) => ({
  contactMediumChangeRequest: {
    partyRoleId: partyRoleId,
    contactMedium: {
      contactMediumType: 'ADDRESS',
      primary: true,
      validFrom: new Date(),
      addressType: 'KTP',
      address: {
        country: data.country,
        line1: data.streetAddress,
        locality: data.locality,
        status: 'VALID',
        postalcode: data.postalCode,
        stateOrProvince: data.stateOrProvince,
        district: data.district,
        subdistrict: data.subdistrict,
        __metadata: {
          type: 'com.kloudville.location.model.genericAddress',
        },
      },
      __metadata: {
        type: 'com.kloudville.party.model.addressContactMedium',
      },
    },
  },
});
