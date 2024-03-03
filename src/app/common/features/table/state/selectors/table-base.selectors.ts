import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TableFeatureStateModel } from '@features/table/models';

export const tableFeatureName = 'tableFeature';

export const getTableBaseState = createFeatureSelector<TableFeatureStateModel>(tableFeatureName);

export const getTableState = createSelector(getTableBaseState, (state) => state?.table);
