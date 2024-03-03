import { createSelector, MemoizedSelector } from '@ngrx/store';

import { IReferenceDataViewListItemModel } from '@features/reference-data/models';
import { IReferenceDataStateEntryModel } from '@features/reference-data/state/models';
import { getDynamicDataParamsKey, getLanguageDynamicDataKey } from '@features/reference-data/state/utils';

import { getLanguageDynamicReferenceDataState } from './reference-data-base.selectors';

const entryStateSelectorsMap = new Map<string, MemoizedSelector<object, IReferenceDataStateEntryModel>>();

const getKey = (dataKey: string, params: any, lang: string) =>
  `#dataKey#_${dataKey}_#params#_${getDynamicDataParamsKey(params)}_#languageKey#_${lang}`;

const createLanguageDynamicDataEntryStateSelector = (dataKey: string, params: any, lang: string) => {
  const key = getKey(dataKey, params, lang);

  if (!entryStateSelectorsMap.has(key)) {
    entryStateSelectorsMap.set(
      key,
      createSelector(
        getLanguageDynamicReferenceDataState,
        (state) => state?.[getLanguageDynamicDataKey(dataKey, lang)]?.[getDynamicDataParamsKey(params)]
      )
    );
  }

  return entryStateSelectorsMap.get(key);
};

const createEntrySelector = <T>(transformFn: (state: IReferenceDataStateEntryModel) => T) => {
  const memorizationMap = new Map<string, MemoizedSelector<object, T>>();

  return (dataKey: string, params: any, lang: string) => {
    const key = getKey(dataKey, params, lang);
    if (!memorizationMap.has(key)) {
      const entryStateSelector = createLanguageDynamicDataEntryStateSelector(dataKey, params, lang);
      memorizationMap.set(key, createSelector(entryStateSelector, transformFn));
    }
    return memorizationMap.get(key);
  };
};

export const createLanguageDynamicReferenceDataListSelector = createEntrySelector((state) => {
  if (!state) return [];

  const { order, listItemsMap } = state;

  return order.map((key) => listItemsMap[key] as IReferenceDataViewListItemModel);
});

export const createLanguageDynamicReferenceDataRequiresLoadSelector = createEntrySelector(
  (state) => !state?.loadInitialized
);

export const createLanguageDynamicReferenceDataLoadedSelector = createEntrySelector(
  (state) => state?.loadFinished ?? false
);
