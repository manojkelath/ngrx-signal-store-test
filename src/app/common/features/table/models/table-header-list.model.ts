import { TableFieldTypesEnum } from '@features/table/enums';

export interface TableHeaderListModel<T = any> {
  title: string;
  key: string;
  type: TableFieldTypesEnum;
  sortKey?: string;
  dateFormat?: string;
  isOnlyTableField?: boolean;
  isOnlyCardField?: boolean;
  className?: `table__cell${string}`;
  innerHtml?: (item: T) => string;
  isCopy?: boolean;
}
