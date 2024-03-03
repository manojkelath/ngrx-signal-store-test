import { StatusNotificationsPromotionsApiModel } from './status-notifications-promotions-api.model';
import { StatusNotificationsTransactionsApiModel } from './status-notifications-transactions-api.model';

export interface StatusNotificationsApiModel {
  transactions: StatusNotificationsTransactionsApiModel;
  promotions: StatusNotificationsPromotionsApiModel;
}
