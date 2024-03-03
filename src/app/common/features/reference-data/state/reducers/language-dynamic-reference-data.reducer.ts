import { Action, createReducer, on } from '@ngrx/store';

import { ReferenceDataLoadingActions } from '@features/reference-data/state/actions';
import { IReferenceDataStateEntryModel, IReferenceDataStateListItemModel } from '@features/reference-data/state/models';
import { updateLanguageDynamicState } from '@features/reference-data/state/utils';

const defaultEntityState = { listItemsMap: {}, order: [], loadInitialized: false, loadFinished: false };

const initialEntityState: Record<string, Record<string, IReferenceDataStateEntryModel>> = {};

const reducer = createReducer(
  initialEntityState,
  on(ReferenceDataLoadingActions.languageDynamicDataStartLoad, (state, { dataKey, params, lang }) =>
    updateLanguageDynamicState(state, dataKey, params, lang, (currentEntityState) => ({
      ...defaultEntityState,
      ...currentEntityState,
      loadInitialized: true,
    }))
  ),
  on(ReferenceDataLoadingActions.languageDynamicDataLoadSuccess, (state, { dataKey, params, lang, response }) =>
    updateLanguageDynamicState(state, dataKey, params, lang, (currentEntityState) => ({
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
  on(ReferenceDataLoadingActions.languageDynamicDataLoadFail, (state, { dataKey, params, lang }) =>
    updateLanguageDynamicState(state, dataKey, params, lang, (currentEntityState) => ({
      ...defaultEntityState,
      ...currentEntityState,
      loadInitialized: false,
      loadFinished: false,
      listItemsMap: {},
      order: [],
    }))
  )
);

export function languageDynamicReferenceDataReducer(state: any | undefined, action: Action): any {
  return reducer(state, action);
}
