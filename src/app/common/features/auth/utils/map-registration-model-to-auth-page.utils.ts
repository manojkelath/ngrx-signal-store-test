import { RegistrationModelEnum } from '@features/app-configuration/enums';
import { AuthPagesEnum } from '@features/auth/enums';

export const mapRegistrationModelToAuthPage = (model: RegistrationModelEnum): AuthPagesEnum => {
  switch (model) {
    case RegistrationModelEnum.AH:
      return AuthPagesEnum.AH_SIGN_UP;
    case RegistrationModelEnum.KV:
      return AuthPagesEnum.KV_SIGN_UP;
    default:
      return AuthPagesEnum.KV_SIGN_UP;
  }
};
