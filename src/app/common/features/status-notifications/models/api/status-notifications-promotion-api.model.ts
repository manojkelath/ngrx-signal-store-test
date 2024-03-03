import { MultiPageSearchFieldApiModel, MultiPageSearchResultItemApiModel } from '@shared/models/multipage-search';

export interface StatusNotificationsPromotionApiModel extends MultiPageSearchResultItemApiModel {
  top: MultiPageSearchFieldApiModel[];
}
