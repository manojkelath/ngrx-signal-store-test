import { createActionGroup, props } from '@ngrx/store';

export const TableSearchActions = createActionGroup({
  source: 'Table Search',
  events: {
    changed: props<{ search: string }>(),
  },
});
