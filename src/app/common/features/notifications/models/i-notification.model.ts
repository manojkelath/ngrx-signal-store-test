import { NotificationTypeEnum } from '@features/notifications/enums';

export interface INotificationModel {
  text: string;
  type: NotificationTypeEnum;
}
