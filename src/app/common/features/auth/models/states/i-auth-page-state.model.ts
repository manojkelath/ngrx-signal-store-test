import { AuthPageRequestedByEnum, AuthPagesEnum } from '@features/auth/enums';
import { ConfValidationCodeModel, ISignUpInfoModel } from '@features/auth/models';

export interface IAuthPageStateModel {
  activePage: AuthPagesEnum;
  lastPageRequestedBy: AuthPageRequestedByEnum | undefined;
  signupInfo: ISignUpInfoModel;
  confValidationCode: ConfValidationCodeModel;
  isSuccessfullyRegistered: boolean;
  isSuccessfullyPasswordReset: boolean;
}
