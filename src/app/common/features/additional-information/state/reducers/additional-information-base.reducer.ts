import { ActionReducerMap } from '@ngrx/store';

import { IAdditionalInformationFeatureStateModel } from '@features/additional-information/models';

import { additionalInformationReducer } from './additional-information.reducer';

export const additionalInformationFeatureReducers: ActionReducerMap<IAdditionalInformationFeatureStateModel> = {
  additionalInformation: additionalInformationReducer,
};
