import { ActionDropdownTypeEnum } from '@features/overlay/enums';

export interface ActionDropdownItemModel {
  type: ActionDropdownTypeEnum;
  text: string;
  icon?: string;
  disabled?: boolean;
}
