import { StatusNotificationsPromotionApiModel } from './status-notifications-promotion-api.model';

export interface StatusNotificationsPromotionsApiModel {
  totalHits: number;
  sortby: string;
  item: StatusNotificationsPromotionApiModel[];
}
