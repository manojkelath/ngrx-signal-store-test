import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { IApiErrorModel } from '@shared/models';

export const TermsToSubscribeApiActions = createActionGroup({
  source: 'Terms to subscribe API',
  events: {
    'Load term': emptyProps(),
    'Load term success': props<{ terms: any }>(),
    'Load term failed': props<{ error: IApiErrorModel }>(),

    'Accept terms': props<{ terms: string }>(),
    'Accept terms success': emptyProps(),
    'Accept terms failed': props<{ error: IApiErrorModel }>(),
  },
});
