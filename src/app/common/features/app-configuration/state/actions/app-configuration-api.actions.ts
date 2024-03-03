import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AppConfigurationApiModel } from '@features/app-configuration/models/api';
import { IApiErrorModel } from '@shared/models';

export const AppConfigurationApiActions = createActionGroup({
  source: 'App Configuration API',
  events: {
    'Load external configurations': emptyProps(),

    'Load success': props<{ configuration: AppConfigurationApiModel }>(),
    'Load failed': props<{ error: IApiErrorModel }>(),
  },
});
