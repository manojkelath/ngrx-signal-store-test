import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAdditionalInformationFeatureStateModel } from '@features/additional-information/models/state';

export const additionalInformationFeatureName = 'additionalInformationFeature';

export const getAdditionalInformationFeatureState = createFeatureSelector<IAdditionalInformationFeatureStateModel>(
  additionalInformationFeatureName
);

export const getAdditionalInformationState = createSelector(
  getAdditionalInformationFeatureState,
  (state) => state?.additionalInformation
);
