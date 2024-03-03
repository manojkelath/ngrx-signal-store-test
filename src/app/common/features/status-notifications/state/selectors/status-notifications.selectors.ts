import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StatusNotificationsStateModel } from '@features/status-notifications/models/state';
import {
  getStatusNotificationTabs,
  statusNotificationsPromotionsViewMapper,
  statusNotificationsTransactionsViewMapper,
} from '@features/status-notifications/utils';
import { getActiveLanguage } from '@features/translate/state/selectors';

export const statusNotificationsFeatureName = 'statusNotificationsFeature';

export const getStatusNotificationsState =
  createFeatureSelector<StatusNotificationsStateModel>(statusNotificationsFeatureName);

export const getStatusNotifications = createSelector(
  getStatusNotificationsState,
  getActiveLanguage,
  (state, activeLang) => state.notifications?.[activeLang]
);

export const getStatusNotificationsTransactionsState = createSelector(
  getStatusNotifications,
  (notifications) => notifications?.transactions
);

export const getStatusNotificationsTransactions = createSelector(
  getStatusNotificationsTransactionsState,
  (notifications) => statusNotificationsTransactionsViewMapper(notifications)
);

export const getStatusNotificationsPromotions = createSelector(getStatusNotifications, (notifications) =>
  statusNotificationsPromotionsViewMapper(notifications?.promotions)
);

export const getHasTransactionsNotifications = createSelector(
  getStatusNotificationsTransactionsState,
  (notifications) =>
    !!(
      notifications?.ordersFulfillmentCount ||
      notifications?.ordersRecentlyCompletedCount ||
      notifications?.ordersWaitingPaymentCount ||
      notifications?.ordersWithIssuesCount
    )
);

export const getHasPromotionsNotifications = createSelector(
  getStatusNotificationsPromotions,
  (promotions) => !!promotions?.length
);

export const getStatusNotificationsTabs = createSelector(
  getHasTransactionsNotifications,
  getHasPromotionsNotifications,
  (hasTransactionsNotifications, hasPromotionsNotifications) =>
    getStatusNotificationTabs(hasTransactionsNotifications, hasPromotionsNotifications)
);

export const getHasStatusNotifications = createSelector(
  getHasTransactionsNotifications,
  getHasPromotionsNotifications,
  (hasTransactionsNotifications, hasPromotionsNotifications) =>
    hasTransactionsNotifications || hasPromotionsNotifications
);
