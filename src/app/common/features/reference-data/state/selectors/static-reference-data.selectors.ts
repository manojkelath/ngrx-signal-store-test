import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IReferenceDataViewListItemModel } from '@features/reference-data/models';
import { IReferenceDataStateEntryModel } from '@features/reference-data/state/models';

import { getStaticReferenceDataState } from './reference-data-base.selectors';

const entryStateSelectorsMap = new Map<string, MemoizedSelector<object, IReferenceDataStateEntryModel>>();

export const createStaticDataEntryStateSelector = (dataKey: string) => {
  if (!entryStateSelectorsMap.has(dataKey)) {
    entryStateSelectorsMap.set(
      dataKey,
      createSelector(getStaticReferenceDataState, (state) => state?.[dataKey])
    );
  }

  return entryStateSelectorsMap.get(dataKey);
};

const createEntrySelector = <T>(transformFn: (state: IReferenceDataStateEntryModel) => T) => {
  const memorizationMap = new Map<string, MemoizedSelector<object, T>>();

  return (dataKey: string) => {
    if (!memorizationMap.has(dataKey)) {
      const entryStateSelector = createStaticDataEntryStateSelector(dataKey);

      memorizationMap.set(dataKey, createSelector(entryStateSelector, transformFn));
    }

    return memorizationMap.get(dataKey);
  };
};

export const createStaticReferenceDataListSelector = createEntrySelector((state) => {
  if (!state || !state?.order || !state?.listItemsMap) return [];
  const { order, listItemsMap } = state;

  return order.map((key) => listItemsMap[key] as IReferenceDataViewListItemModel);
});

export const createStaticReferenceDataRequiresLoadSelector = createEntrySelector((state) => !state?.loadInitialized);

export const createStaticReferenceDataLoadedSelector = createEntrySelector((state) => state?.loadFinished ?? false);

const displayValueSelectors = new Map<string, MemoizedSelector<object, string>>();

export const createStaticReferenceDataDisplayValueSelector = (dataKey: string, itemCode: string) => {
  const key = `#dataKey#_${dataKey}_#itemCode#_${itemCode}`;

  if (!displayValueSelectors.has(dataKey)) {
    const entityStateSelector = createStaticDataEntryStateSelector(dataKey);

    displayValueSelectors.set(
      key,
      createSelector(entityStateSelector, (state) => state?.listItemsMap?.[itemCode]?.description)
    );
  }

  return displayValueSelectors.get(key);
};
