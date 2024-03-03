import { Action, createReducer, on } from '@ngrx/store';

import { TableStateModel } from '@features/table/models';
import { TableActions } from '@features/table/state/actions';

export const initialTableState: TableStateModel = {
  clickedRowId: undefined,
};

const reducer = createReducer(
  initialTableState,
  on(TableActions.reset, () => initialTableState),
  on(TableActions.clickedRow, (state, { rowId }) => ({
    ...state,
    clickedRowId: rowId,
  }))
);

export function tableReducer(state: TableStateModel | undefined, action: Action): TableStateModel {
  return reducer(state, action);
}
