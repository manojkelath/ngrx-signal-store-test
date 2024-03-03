import { ActionReducerMap } from '@ngrx/store';

import { IReferenceDataStateModel } from '@features/reference-data/state/models';

import { dynamicReferenceDataReducer } from './dynamic-reference-data.reducer';
import { languageDynamicReferenceDataReducer } from './language-dynamic-reference-data.reducer';
import { staticReferenceDataReducer } from './static-reference-data.reducer';

export const referenceDataFeatureReducers: ActionReducerMap<IReferenceDataStateModel> = {
  staticData: staticReferenceDataReducer,
  dynamicData: dynamicReferenceDataReducer,
  languageDynamicData: languageDynamicReferenceDataReducer,
};
