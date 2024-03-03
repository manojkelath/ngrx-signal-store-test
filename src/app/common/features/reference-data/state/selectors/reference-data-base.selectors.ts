import { createFeatureSelector, createSelector } from '@ngrx/store';

import { REFERENCE_DATA_STATE_FEATURE } from '@features/reference-data/state/constants';
import { IReferenceDataStateModel } from '@features/reference-data/state/models';

export const getReferenceDataFeatureState =
  createFeatureSelector<IReferenceDataStateModel>(REFERENCE_DATA_STATE_FEATURE);

export const getStaticReferenceDataState = createSelector(getReferenceDataFeatureState, (state) => state.staticData);

export const getDynamicReferenceDataState = createSelector(getReferenceDataFeatureState, (state) => state.dynamicData);

export const getLanguageDynamicReferenceDataState = createSelector(
  getReferenceDataFeatureState,
  (state) => state.languageDynamicData
);
