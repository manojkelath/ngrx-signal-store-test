import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthFeatureStateModel } from '@features/auth/models';

export const authFeatureName = 'authFeature';

export const getAuthFeatureState = createFeatureSelector<IAuthFeatureStateModel>(authFeatureName);

export const getAuthPageState = createSelector(getAuthFeatureState, (state) => state?.authPage);

export const getUserState = createSelector(getAuthFeatureState, (state) => state.user);
