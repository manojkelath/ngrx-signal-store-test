import { ActionDropdownTypeEnum } from '@features/overlay/enums';

export interface TableActionDropdownCellModel {
  type: ActionDropdownTypeEnum;
  id: string;
  expandedId?: string;
}
