import { Action, createReducer, on } from '@ngrx/store';

import { AuthPagesEnum } from '@features/auth/enums';
import { IAuthPageStateModel } from '@features/auth/models';
import { AuthActions, AuthPageActions } from '@features/auth/state/actions';

export const initialAuthPageState: IAuthPageStateModel = {
  activePage: AuthPagesEnum.LOGIN,
  lastPageRequestedBy: undefined,
  signupInfo: null,
  confValidationCode: null,
  isSuccessfullyRegistered: false,
  isSuccessfullyPasswordReset: false,
};

const reducer = createReducer(
  initialAuthPageState,
  on(AuthPageActions.openAuthOverlay, (state, { page }) => ({
    ...state,
    activePage: page,
    lastPageRequestedBy: undefined,
  })),
  on(AuthPageActions.authOverlayClosed, (state) => ({
    ...state,
    activePage: AuthPagesEnum.LOGIN,
  })),
  on(AuthActions.signupSubmittedDataInitiated, (state, { signupInfo }) => ({
    ...state,
    signupInfo,
  })),
  on(AuthActions.sendValidationCodeInitiated, (state) => ({
    ...state,
    confValidationCode: null,
  })),
  on(AuthActions.sendValidationCodeSuccess, (state, { confValidationCode }) => ({
    ...state,
    confValidationCode,
  })),
  on(AuthActions.signupSuccess, AuthActions.ahSignupSuccess, (state) => ({
    ...state,
    signupInfo: null,
    isSuccessfullyRegistered: true,
  })),
  on(AuthPageActions.authOverlaySimpleClosed, AuthPageActions.openAuthOverlay, (state) => ({
    ...state,
    isSuccessfullyRegistered: false, //TODO: review
    isSuccessfullyPasswordReset: false,
    signupInfo: null,
  })),
  on(AuthActions.forgotPasswordSuccess, (state) => ({
    ...state,
    isSuccessfullyPasswordReset: true,
  })),
  on(AuthPageActions.storePageRequestedBy, (state, { requestedBy }) => ({
    ...state,
    lastPageRequestedBy: requestedBy,
  }))
);

export function authPageReducer(state: IAuthPageStateModel | undefined, action: Action): IAuthPageStateModel {
  return reducer(state, action);
}
