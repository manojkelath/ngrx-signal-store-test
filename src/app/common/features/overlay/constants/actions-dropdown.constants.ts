import { ActionDropdownTypeEnum } from '@features/overlay/enums';
import { ActionDropdownItemModel } from '@features/overlay/models';

export const BASIC_DROPDOWN_ACTIONS: ActionDropdownItemModel[] = [
  {
    text: 'shared.edit',
    icon: 'pencil.svg',
    type: ActionDropdownTypeEnum.EDIT,
  },
  {
    text: 'shared.delete',
    icon: 'trash.svg',
    type: ActionDropdownTypeEnum.DELETE,
  },
];
