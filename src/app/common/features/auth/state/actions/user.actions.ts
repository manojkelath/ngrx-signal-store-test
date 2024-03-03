import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { IUserModel } from '@features/auth/models';

export const UserActions = createActionGroup({
  source: 'App User',
  events: {
    'API User changed': props<{ userInfo: IUserModel }>(),
    'Invalid token detected': emptyProps(),
    'User successfully registered': emptyProps(),
  },
});
