import { createActionGroup, emptyProps } from '@ngrx/store';

export const OrderCommonActions = createActionGroup({
  source: 'Order Common',
  events: {
    'Delete order success': emptyProps(),
  },
});
