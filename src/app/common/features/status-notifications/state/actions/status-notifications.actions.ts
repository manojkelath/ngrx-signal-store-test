import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { StatusNotificationsApiModel } from '@features/status-notifications/models/api';
import { IApiErrorModel } from '@shared/models';

export const StatusNotificationsActions = createActionGroup({
  source: 'Status Notifications API',
  events: {
    Reset: emptyProps(),
    'Load initiated': emptyProps(),
    'Load success': props<{ notifications: StatusNotificationsApiModel; lang: string }>(),
    'Load failed': props<{ error: IApiErrorModel }>(),
  },
});
