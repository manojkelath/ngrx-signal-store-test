import { ISelectOptionModel } from '@features/custom-select';
import { PaginationSizePerPageEnum } from '@features/table/enums';

export const SIZES_OPTION: ISelectOptionModel[] = [
  {
    value: `${PaginationSizePerPageEnum.SMALL}`,
    key: `${PaginationSizePerPageEnum.SMALL}`,
  },
  {
    value: `${PaginationSizePerPageEnum.STANDARD}`,
    key: `${PaginationSizePerPageEnum.STANDARD}`,
  },
  {
    value: `${PaginationSizePerPageEnum.LARGE}`,
    key: `${PaginationSizePerPageEnum.LARGE}`,
  },
];
