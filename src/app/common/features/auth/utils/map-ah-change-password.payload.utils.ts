import { IChangePasswordModel } from '@features/auth/models';
import { AhChangePasswordPayloadModel } from '@features/auth/models/api';

export const mapAhChangePasswordPayload = (
  changePassword: IChangePasswordModel,
  userId: string
): AhChangePasswordPayloadModel => ({
  email: userId,
  oldPassword: changePassword.oldPassword,
  newPassword: changePassword.newPassword2,
});
