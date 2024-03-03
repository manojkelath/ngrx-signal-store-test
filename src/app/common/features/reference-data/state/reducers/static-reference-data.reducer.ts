import { Action, createReducer, on } from '@ngrx/store';

import { ReferenceDataLoadingActions } from '@features/reference-data/state/actions';
import { IReferenceDataStateEntryModel, IReferenceDataStateListItemModel } from '@features/reference-data/state/models';

const defaultEntityState = { listItemsMap: {}, order: [], loadInitialized: false, loadFinished: false };

const initialProductDetailsState: Record<string, IReferenceDataStateEntryModel> = {};

const reducer = createReducer(
  initialProductDetailsState,
  on(ReferenceDataLoadingActions.simpleDataStartLoad, (state, { dataKey }) => ({
    ...state,
    [dataKey]: {
      ...defaultEntityState,
      ...state[dataKey],
      loadInitialized: true,
    },
  })),
  on(ReferenceDataLoadingActions.simpleDataLoadSuccess, (state, { dataKey, response }) => ({
    ...state,
    [dataKey]: {
      ...defaultEntityState,
      ...state[dataKey],
      loadInitialized: true,
      loadFinished: true,
      order: response?.dynamicEnumList?.code?.map((item) => item.code),
      listItemsMap: response?.dynamicEnumList?.code?.reduce((acc, item) => {
        acc[item.code] = {
          code: item.code,
          description: item.description,
        };
        return acc;
      }, {} as Record<string, IReferenceDataStateListItemModel>),
    },
  })),
  on(ReferenceDataLoadingActions.simpleDataLoadFail, (state, { dataKey }) => ({
    ...state,
    [dataKey]: {
      ...defaultEntityState,
      ...state[dataKey],
      loadInitialized: false,
      loadFinished: false,
      listItemsMap: {},
      order: [],
    },
  }))
);

export function staticReferenceDataReducer(state: any | undefined, action: Action): any {
  return reducer(state, action);
}
