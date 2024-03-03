import { IReferenceDataStateListItemModel } from './i-reference-data-state-list-item.model';

export interface IReferenceDataStateEntryModel {
  listItemsMap: Record<string, IReferenceDataStateListItemModel>;
  order: string[];
  loadInitialized: boolean;
  loadFinished: boolean;
}
