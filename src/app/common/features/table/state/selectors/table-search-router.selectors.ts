import { createSelector } from '@ngrx/store';

import { SearchQueryParamsEnum } from '@features/table/enums';
import { selectQueryParams } from '@shared/state/selectors';

export const getTableSearch = createSelector(
  selectQueryParams,
  (queryParams) => queryParams[SearchQueryParamsEnum.SEARCH] || null
);
