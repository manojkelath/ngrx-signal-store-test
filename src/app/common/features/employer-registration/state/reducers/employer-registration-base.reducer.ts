import { ActionReducerMap } from '@ngrx/store';

import { EmployerRegistrationStateModel } from '@features/employer-registration/models/state';

import { employerRegistrationFormReducer } from './employer-registration.reducer';

export const employerRegistrationFeatureReducer: ActionReducerMap<EmployerRegistrationStateModel> = {
  employerRegistrationForm: employerRegistrationFormReducer,
};
