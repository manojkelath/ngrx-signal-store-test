import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LeadsFeatureState } from '@features/leads/models/state';

export const leadsFeatureName = 'leadsFeature';

export const getLeadsState = createFeatureSelector<LeadsFeatureState>(leadsFeatureName);

export const selectRegisterFormState = createSelector(getLeadsState, (state) => state.registerForm);
