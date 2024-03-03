import { FileSizeTypeEnum } from '@features/files/enums';

export const formatBytes = (bytes: number, size: FileSizeTypeEnum = FileSizeTypeEnum.MB): number =>
  Number((bytes / Math.pow(1024, size)).toFixed(2));
