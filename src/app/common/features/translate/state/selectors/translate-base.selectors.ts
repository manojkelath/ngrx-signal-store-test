import { createFeatureSelector, createSelector } from '@ngrx/store';

export const translateFeatureName = 'translateFeature';

export const getTranslateFeatureState = createFeatureSelector<any>(translateFeatureName);

export const getTranslateState = createSelector(getTranslateFeatureState, (state) => state.translate);
