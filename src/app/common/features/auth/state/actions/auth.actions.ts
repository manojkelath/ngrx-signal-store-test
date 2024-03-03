import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AuthAPIActionsEventsEnum } from '@features/auth/enums';
import {
  AhSignUpModel,
  ConfValidationCodeModel,
  IChangePasswordModel,
  IForgotPasswordModel,
  IIdentificationInfoModel,
  ILoginInfoModel,
  ISignUpInfoModel,
} from '@features/auth/models';
import { IApiErrorModel } from '@shared/models';

export const AUTH_API_ACTION_SOURCE = 'Auth API';

export const AuthActions = createActionGroup({
  source: AUTH_API_ACTION_SOURCE,
  events: {
    'Login initiated': props<{ loginInfo: ILoginInfoModel }>(),
    [AuthAPIActionsEventsEnum.LOGIN_SUCCESS]: emptyProps(),
    'Login failed': props<{ error: IApiErrorModel }>(),

    'Change password request': emptyProps(),
    'Change password initiated': props<{ changePassword: IChangePasswordModel }>(),
    'Change password KV': props<{ changePassword: IChangePasswordModel }>(),
    'Change password AH': props<{ changePassword: IChangePasswordModel }>(),
    'Change password success': emptyProps(),
    'Change password failed': props<{ error: IApiErrorModel }>(),

    'Forgot password initiated': props<{ forgotPassword: IForgotPasswordModel }>(),
    'Forgot password success': emptyProps(),
    'Forgot password failed': props<{ error: IApiErrorModel }>(),

    'Signup submitted data initiated': props<{ signupInfo: ISignUpInfoModel }>(),

    'Signup initiated': props<{ signupInfo: ISignUpInfoModel }>(),
    'Signup success': emptyProps(),
    'Signup failed': props<{ error: IApiErrorModel }>(),
    'Send validation code initiated': emptyProps(),
    'Send validation code success': props<{ confValidationCode: ConfValidationCodeModel }>(),
    'Send validation code failed': props<{ error: IApiErrorModel }>(),
    'Check validation code initiated': props<{ code: string }>(),
    'Check validation code success': props<{ code: string }>(),
    'Check validation code failed': props<{ error: IApiErrorModel }>(),

    'User identification initiated': props<{ data: IIdentificationInfoModel }>(),
    [AuthAPIActionsEventsEnum.USER_IDENTIFICATION_SUCCESS]: emptyProps(),
    'User identification failed': props<{ error: IApiErrorModel }>(),

    'Logout initiated': emptyProps(),
    'Logout success': emptyProps(),
    'Logout failed': props<{ error: IApiErrorModel }>(),

    'Ah Signup': props<{ user: AhSignUpModel }>(),
    'Ah Signup Success': emptyProps(),
    'Ah Signup Failed': props<{ error: IApiErrorModel }>(),
  },
});
