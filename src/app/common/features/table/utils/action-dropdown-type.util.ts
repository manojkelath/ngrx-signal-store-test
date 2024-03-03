import { ActionDropdownTypeEnum } from '@features/overlay/enums';

export const mapActionDropdownTypeToRoute = (type: ActionDropdownTypeEnum): string => {
  switch (type) {
    default:
      return type.toLowerCase();
  }
};
