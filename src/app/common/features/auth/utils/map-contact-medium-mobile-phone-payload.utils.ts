import { IIdentificationInfoModel } from '@features/auth/models';

export const mapContactMediumMobilePhonePayload = (partyRoleId: string, data: IIdentificationInfoModel) => ({
  contactMediumChangeRequest: {
    partyRoleId: partyRoleId,
    contactMedium: {
      contactMediumType: 'PHONE',
      primary: false,
      validFrom: new Date(),
      phoneNr: data.mobilePhone,
      phoneType: 'MOBILE',
      __metadata: {
        type: 'com.kloudville.party.model.phoneContactMedium',
      },
    },
  },
});
