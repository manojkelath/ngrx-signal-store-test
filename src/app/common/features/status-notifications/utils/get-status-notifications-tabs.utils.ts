import { StatusNotificationsTabsEnum } from '@features/status-notifications/enums';
import { StatusNotificationsTabModel } from '@features/status-notifications/models/view';

export const getStatusNotificationTabs = (
  hasTransactionsNotifications: boolean,
  hasPromotionsNotifications: boolean
): StatusNotificationsTabModel[] => [
  {
    title: 'transactions',
    value: StatusNotificationsTabsEnum.TRANSACTIONS,
    hasNotifications: hasTransactionsNotifications,
  },
  {
    title: 'promo-and-updates',
    value: StatusNotificationsTabsEnum.PROMO_AND_UPDATES,
    hasNotifications: hasPromotionsNotifications,
  },
];
