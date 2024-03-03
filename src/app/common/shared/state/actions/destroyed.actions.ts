import { createActionGroup, emptyProps } from '@ngrx/store';

export const DestroyedActions = createActionGroup({
  source: 'App',
  events: {
    'Product Payment Page destroyed': emptyProps,
  },
});
