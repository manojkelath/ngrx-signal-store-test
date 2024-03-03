import { IReferenceDataResponseListItemMetadataAccessModel } from './i-reference-data-response-list-item-metadata-access.model';

export interface IReferenceDataResponseListItemMetadataModel {
  type: string;
  id: string;
  access: IReferenceDataResponseListItemMetadataAccessModel;
}
