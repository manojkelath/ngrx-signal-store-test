import { createActionGroup, props } from '@ngrx/store';

import { IReferenceDataResponseModel } from '@features/reference-data/models';
import { IApiErrorModel } from '@shared/models';

export const ReferenceDataLoadingActions = createActionGroup({
  source: 'Reference data loading',
  events: {
    'simple data request': props<{ dataKey: string }>(),
    'simple data start load': props<{ dataKey: string }>(),
    'simple data load success': props<{ dataKey: string; response: IReferenceDataResponseModel }>(),
    'simple data load fail': props<{ dataKey: string; error: IApiErrorModel }>(),

    'dynamic data request': props<{ dataKey: string; params: any }>(),
    'dynamic data start load': props<{ dataKey: string; params: any }>(),
    'dynamic data load success': props<{ dataKey: string; params: any; response: IReferenceDataResponseModel }>(),
    'dynamic data load fail': props<{ dataKey: string; params: any; error: IApiErrorModel }>(),

    'language dynamic data request': props<{ dataKey: string; params: any }>(),
    'language dynamic data start load': props<{ dataKey: string; params: any; lang: string }>(),
    'language dynamic data load success': props<{
      dataKey: string;
      params: any;
      lang: string;
      response: IReferenceDataResponseModel;
    }>(),
    'language dynamic data load fail': props<{ dataKey: string; params: any; lang: string; error: IApiErrorModel }>(),
  },
});
