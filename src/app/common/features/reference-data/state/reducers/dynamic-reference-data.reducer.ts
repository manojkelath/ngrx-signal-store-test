import { Action, createReducer, on } from '@ngrx/store';

import { ReferenceDataLoadingActions } from '@features/reference-data/state/actions';
import { IReferenceDataStateEntryModel, IReferenceDataStateListItemModel } from '@features/reference-data/state/models';
import { updateDynamicState } from '@features/reference-data/state/utils';

const defaultEntityState = { listItemsMap: {}, order: [], loadInitialized: false, loadFinished: false };

const initialProductDetailsState: Record<string, Record<string, IReferenceDataStateEntryModel>> = {};

const reducer = createReducer(
  initialProductDetailsState,
  on(ReferenceDataLoadingActions.dynamicDataStartLoad, (state, { dataKey, params }) =>
    updateDynamicState(state, dataKey, params, (currentEntityState) => ({
      ...defaultEntityState,
      ...currentEntityState,
      loadInitialized: true,
    }))
  ),
  on(ReferenceDataLoadingActions.dynamicDataLoadSuccess, (state, { dataKey, params, response }) =>
    updateDynamicState(state, dataKey, params, (currentEntityState) => ({
      ...defaultEntityState,
      ...currentEntityState,
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
    }))
  ),
  on(ReferenceDataLoadingActions.dynamicDataLoadFail, (state, { dataKey, params }) =>
    updateDynamicState(state, dataKey, params, (currentEntityState) => ({
      ...defaultEntityState,
      ...currentEntityState,
      loadInitialized: false,
      loadFinished: false,
      listItemsMap: {},
      order: [],
    }))
  )
);

export function dynamicReferenceDataReducer(state: any | undefined, action: Action): any {
  return reducer(state, action);
}
