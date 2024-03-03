import { IReferenceDataResponseListItemModel } from './i-reference-data-response-list-item.model';
import { IReferenceDataResponseMetadataModel } from './i-reference-data-response-metadata.model';

export interface IReferenceDataResponseModel {
  dynamicEnumList: {
    __metadata: IReferenceDataResponseMetadataModel;
    expiry: number;
    code: IReferenceDataResponseListItemModel[];
  };
}
