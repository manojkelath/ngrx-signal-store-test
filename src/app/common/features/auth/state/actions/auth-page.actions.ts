import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AuthPageRequestedByEnum, AuthPagesEnum } from '@features/auth/enums';

export const AuthPageActions = createActionGroup({
  source: 'Auth page',
  events: {
    'Auth overlay page changed': props<{ page: AuthPagesEnum }>(),
    'Auth overlay closed': emptyProps(),
    'Auth overlay simple closed': emptyProps(),
    'Open sign up page': emptyProps(),
    'Open auth overlay': props<{ page: AuthPagesEnum }>(),
    'Store page requested by': props<{ requestedBy?: AuthPageRequestedByEnum }>(),
  },
});
