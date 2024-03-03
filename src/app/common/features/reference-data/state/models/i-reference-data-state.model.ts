import { IReferenceDataStateEntryModel } from './i-reference-data-state-entry.model';

export interface IReferenceDataStateModel {
  staticData: Record<string, IReferenceDataStateEntryModel>;
  dynamicData: Record<string, Record<string, IReferenceDataStateEntryModel>>;
  languageDynamicData: Record<string, Record<string, IReferenceDataStateEntryModel>>;
}
