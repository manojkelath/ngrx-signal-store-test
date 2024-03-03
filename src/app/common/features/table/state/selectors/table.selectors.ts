import { createSelector } from '@ngrx/store';

import { getTableState } from './table-base.selectors';
import { getTableSort } from './table-router.selectors';

export const getTableClickedRowId = createSelector(getTableState, (state) => state?.clickedRowId);

export const getTableParams = createSelector(getTableSort, (sort) => ({ sort }));
