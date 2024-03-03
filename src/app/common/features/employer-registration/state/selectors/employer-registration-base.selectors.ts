import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EmployerRegistrationStateModel } from '@features/employer-registration/models/state';

export const employerRegistrationFeatureName = 'employerRegistrationFeature';

export const getEmployerRegistrationState = createFeatureSelector<EmployerRegistrationStateModel>(
  employerRegistrationFeatureName
);

export const selectEmployerRegistrationFormState = createSelector(
  getEmployerRegistrationState,
  (state) => state.employerRegistrationForm
);
