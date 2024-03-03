import { createSelector } from '@ngrx/store';

import { selectEmployerRegistrationFormState } from './employer-registration-base.selectors';

export const selectEmployerRegistrationFormOpenState = createSelector(
  selectEmployerRegistrationFormState,
  (state) => state.isOpen
);

export const selectEmployerRegistrationMessage = createSelector(
  selectEmployerRegistrationFormState,
  (state) => state.massage
);

export const selectEmployerRegistrationData = createSelector(
  selectEmployerRegistrationFormState,
  (state) => state.employerRegistrationData
);
