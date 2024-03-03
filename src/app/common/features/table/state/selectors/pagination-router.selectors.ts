import { createSelector } from '@ngrx/store';

import { DEFAULT_PAGINATION_SIZE } from '@features/table/constants';
import { PaginationQueryParamsEnum } from '@features/table/enums';
import { selectQueryParams } from '@shared/state/selectors';

export const getPagination = createSelector(selectQueryParams, (queryParams) => {
  const size = queryParams[PaginationQueryParamsEnum.SIZE];
  const page = queryParams[PaginationQueryParamsEnum.PAGE];

  return { size, page };
});

export const getCurrentPage = createSelector(
  selectQueryParams,
  (queryParams) => +queryParams[PaginationQueryParamsEnum.PAGE] || 1
);

export const getCurrentSize = createSelector(
  selectQueryParams,
  (queryParams) => +queryParams[PaginationQueryParamsEnum.SIZE] || DEFAULT_PAGINATION_SIZE
);
