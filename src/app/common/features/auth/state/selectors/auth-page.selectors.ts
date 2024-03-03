import { createSelector } from '@ngrx/store';

import { environment } from '@environment';

import { getAuthPageState } from './auth-base.selectors';

export const getActiveAuthPage = createSelector(getAuthPageState, (state) => state.activePage);

export const getConfValidationCode = createSelector(getAuthPageState, (state) => state.confValidationCode);

export const getSignupInfo = createSelector(getAuthPageState, (state) => state.signupInfo);

export const getEmailSignupInfo = createSelector(getSignupInfo, (state) => state?.email);

export const getIsSuccessfullyRegistered = createSelector(getAuthPageState, (state) => state.isSuccessfullyRegistered);

export const getIsRegistrationWithValidationCode = createSelector(() => environment.isRegistrationWithValidationCode);

export const getIsSuccessfullyPasswordReset = createSelector(
  getAuthPageState,
  (state) => state.isSuccessfullyPasswordReset
);

export const getLastAuthPageRequestedBy = createSelector(getAuthPageState, (state) => state?.lastPageRequestedBy);
