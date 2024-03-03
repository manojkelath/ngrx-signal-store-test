import { IReferenceDataStateEntryModel } from '@features/reference-data/state/models';

export const getDynamicDataParamsKey = (params: any) => JSON.stringify(params);

export const updateDynamicState = (
  state: Record<string, Record<string, IReferenceDataStateEntryModel>>,
  dataKey: string,
  params: any,
  updateFn: (currentEntityState: IReferenceDataStateEntryModel | undefined) => IReferenceDataStateEntryModel
) => {
  const paramsKey = getDynamicDataParamsKey(params);

  return {
    ...state,
    [dataKey]: {
      ...state[dataKey],
      [paramsKey]: updateFn(state[dataKey]?.[paramsKey]),
    },
  };
};
