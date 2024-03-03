import { ActionReducerMap } from '@ngrx/store';

import { LeadsFeatureState } from '@features/leads/models/state';

import { leadRegisterFormReducer } from './register-form.reducer';

export const leadsFeatureReducer: ActionReducerMap<LeadsFeatureState> = {
  registerForm: leadRegisterFormReducer,
};
