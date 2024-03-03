import { IReferenceDataStateEntryModel } from '@features/reference-data/state/models';

export const getLanguageDynamicDataParamsKey = (params: any) => JSON.stringify(params);

export const getLanguageDynamicDataKey = (dataKey: string, lang: string) => `${dataKey}_${lang}`;

export const updateLanguageDynamicState = (
  state: Record<string, Record<string, IReferenceDataStateEntryModel>>,
  dataKey: string,
  params: any,
  lang: string,
  updateFn: (currentEntityState: IReferenceDataStateEntryModel | undefined) => IReferenceDataStateEntryModel
) => {
  const paramsKey = getLanguageDynamicDataParamsKey(params);
  const dataStateKey = getLanguageDynamicDataKey(dataKey, lang);

  return {
    ...state,
    [dataStateKey]: {
      ...state[dataStateKey],
      [paramsKey]: updateFn(state[dataStateKey]?.[paramsKey]),
    },
  };
};
