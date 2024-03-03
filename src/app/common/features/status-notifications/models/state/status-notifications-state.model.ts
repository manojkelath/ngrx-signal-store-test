import { StatusNotificationsApiModel } from '@features/status-notifications/models/api';

export interface StatusNotificationsStateModel {
  notifications: Record<string, StatusNotificationsApiModel>;
}
