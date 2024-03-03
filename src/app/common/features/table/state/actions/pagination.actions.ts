import { createActionGroup, props } from '@ngrx/store';

export const PaginationActions = createActionGroup({
  source: 'Pagination',
  events: {
    'Size changed': props<{ size: number }>(),
    'Page changed': props<{ page: number }>(),
  },
});
