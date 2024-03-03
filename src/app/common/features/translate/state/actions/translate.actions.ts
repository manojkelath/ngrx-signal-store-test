import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { IApiErrorModel } from '@shared/models';

export const TranslateActions = createActionGroup({
  source: 'Translate',
  events: {
    'Switch language': props<{ lang: string }>(),
    'Switch language success': props<{ lang: string }>(),

    'Change user language initiated': props<{ lang: string }>(),
    'Change user language success': emptyProps(),
    'Change user language failed': props<{ error: IApiErrorModel }>(),
  },
});
