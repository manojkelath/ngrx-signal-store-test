import { ActionReducerMap } from '@ngrx/store';

import { TableFeatureStateModel } from '@features/table/models';

import { tableReducer } from './table.reducers';

export const tableFeatureReducers: ActionReducerMap<TableFeatureStateModel> = {
  table: tableReducer,
};
