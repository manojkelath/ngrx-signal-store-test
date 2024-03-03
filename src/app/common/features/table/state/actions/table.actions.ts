import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { TableSortModel } from '@features/table';
import { ToggleViewModel } from '@features/table/models/views';

export const TableActions = createActionGroup({
  source: 'Table',
  events: {
    Reset: emptyProps(),
    'Sort changed': props<{ sortChanged: TableSortModel | null }>(),
    'Toggled changed': props<{ data: ToggleViewModel }>(),
    'Clicked row': props<{ rowId: string }>(),
    'Params changed': emptyProps(),
  },
});
