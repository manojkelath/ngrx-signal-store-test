import { createActionGroup, emptyProps } from '@ngrx/store';

export const UserIdentificationInitActions = createActionGroup({
  source: 'User Identification Init',
  events: {
    'User identification modal init': emptyProps(),
  },
});
