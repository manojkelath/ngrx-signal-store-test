import { createSelector } from '@ngrx/store';

import { getRegistrationConfiguration } from '@features/app-configuration/state/selectors';

export const getRegistrationModel = createSelector(
  getRegistrationConfiguration,
  (configuration) => configuration?.model
);
