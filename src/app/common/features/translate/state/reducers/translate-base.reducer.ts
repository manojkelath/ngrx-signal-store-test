import { ActionReducerMap } from '@ngrx/store';

import { translateReducer } from './translate.reducer';

export const translateFeatureReducers: ActionReducerMap<any> = {
  translate: translateReducer,
};
