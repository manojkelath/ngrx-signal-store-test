import { MultiPageSearchFieldApiModel } from './multipage-search-field-api.model';

export interface MultiPageSearchResultItemApiModel {
  field: MultiPageSearchFieldApiModel[];
  id: string;
  metadata: string;
  title: string;
}
