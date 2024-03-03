import { SortDirectionEnum } from '@features/table/enums';

export interface TableSortModel {
  column: string;
  direction: SortDirectionEnum;
}
