import { createSelector } from '@ngrx/store';

import { TableQueryParamsEnum } from '@features/table/enums';
import { selectQueryParams } from '@shared/state/selectors';

export const getTableSort = createSelector(selectQueryParams, (queryParams) => {
  const column = queryParams[TableQueryParamsEnum.SORT_COLUMN];
  const direction = queryParams[TableQueryParamsEnum.SORT_DIRECTION];

  return column && direction
    ? {
        column,
        direction,
      }
    : null;
});
