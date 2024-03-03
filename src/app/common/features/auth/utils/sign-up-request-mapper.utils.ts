import { IIdentificationInfoModel, IIdentificationRequestModel, ISignUpInfoModel } from '@features/auth/models';

export const mapSignUpRequest = (data: ISignUpInfoModel): ISignUpInfoModel => ({
  ...data,
  companyEmail: data.email,
  companyPhoneNr: data.phoneNr,
});

export const mapSignUpIdentificationRequest = (
  data: ISignUpInfoModel & IIdentificationInfoModel,
  partyRoleId: string
): IIdentificationRequestModel => ({
  partyRoleId,
  identification: [
    {
      type: 'KTP',
      number: data.KTP,
    },
    {
      type: 'KK',
      number: data.KK,
    },
  ],
  photograph: [
    {
      type: 'IDCARD',
      photograph: data.IDCARD,
    },
    {
      type: 'SELFIE',
      photograph: data.SELFIE,
    },
  ],
});
