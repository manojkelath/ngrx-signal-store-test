import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IReferenceDataViewListItemModel } from '@features/reference-data/models';
import { IReferenceDataStateEntryModel } from '@features/reference-data/state/models';
import { getDynamicDataParamsKey } from '@features/reference-data/state/utils';

import { getDynamicReferenceDataState } from './reference-data-base.selectors';

const entryStateSelectorsMap = new Map<string, MemoizedSelector<object, IReferenceDataStateEntryModel>>();

const getKey = (dataKey: string, params: any) => `#dataKey#_${dataKey}_#params#_${getDynamicDataParamsKey(params)}`;

export const createDynamicDataEntryStateSelector = (dataKey: string, params: any) => {
  const key = getKey(dataKey, params);

  if (!entryStateSelectorsMap.has(key)) {
    entryStateSelectorsMap.set(
      key,
      createSelector(getDynamicReferenceDataState, (state) => state?.[dataKey]?.[getDynamicDataParamsKey(params)])
    );
  }

  return entryStateSelectorsMap.get(key);
};

const createEntrySelector = <T>(transformFn: (state: IReferenceDataStateEntryModel) => T) => {
  const memorizationMap = new Map<string, MemoizedSelector<object, T>>();

  return (dataKey: string, params: any) => {
    const key = getKey(dataKey, params);

    if (!memorizationMap.has(key)) {
      const entryStateSelector = createDynamicDataEntryStateSelector(dataKey, params);

      memorizationMap.set(key, createSelector(entryStateSelector, transformFn));
    }

    return memorizationMap.get(key);
  };
};

export const createDynamicReferenceDataListSelector = createEntrySelector((state) => {
  if (!state) return [];

  const { order, listItemsMap } = state;

  return order.map((key) => listItemsMap[key] as IReferenceDataViewListItemModel);
});

export const createDynamicReferenceDataRequiresLoadSelector = createEntrySelector((state) => !state?.loadInitialized);

export const createDynamicReferenceDataLoadedSelector = createEntrySelector((state) => state?.loadFinished ?? false);

const displayValueSelectors = new Map<string, MemoizedSelector<object, string>>();

export const createDynamicReferenceDataDisplayValueSelector = (dataKey: string, params: any, itemCode: string) => {
  const key = `#dataKey#_${dataKey}_#params#_${getDynamicDataParamsKey(params)}_#itemCode#_${itemCode}`;

  if (!displayValueSelectors.has(key)) {
    const entityStateSelector = createDynamicDataEntryStateSelector(dataKey, params);

    displayValueSelectors.set(
      key,
      createSelector(entityStateSelector, (state) => state?.listItemsMap?.[itemCode]?.description)
    );
  }

  return displayValueSelectors.get(key);
};
