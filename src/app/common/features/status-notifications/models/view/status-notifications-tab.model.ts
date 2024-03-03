import { StatusNotificationsTabsEnum } from '@features/status-notifications/enums';

export interface StatusNotificationsTabModel {
  title: string;
  value: StatusNotificationsTabsEnum;
  hasNotifications?: boolean;
}
