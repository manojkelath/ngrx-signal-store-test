import { FileTypeEnum } from '@features/files/enums';

export interface IFileUploadConfigModel {
  format: string;
  types: FileTypeEnum[];
  maxFileSize?: number;
}
