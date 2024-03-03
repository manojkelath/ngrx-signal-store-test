import { environment } from '@environment';

import { OrderStatusApiEnum } from '@features/account/enums';
import { StatusNotificationsTransactionsApiModel } from '@features/status-notifications/models/api';
import { StatusNotificationsTransactionsViewModel } from '@features/status-notifications/models/view';
import { AppRoutesEnum } from '@shared/enums';

export const statusNotificationsTransactionsViewMapper = (
  notifications: StatusNotificationsTransactionsApiModel
): Array<StatusNotificationsTransactionsViewModel[]> => [
  [
    {
      title: 'waiting-payment',
      iconPath: 'account/waiting-payment.svg',
      iconSize: { width: 20, height: 18 },
      notificationsCount: notifications?.ordersWaitingPaymentCount,
      routerLink: [AppRoutesEnum.ACCOUNT, AppRoutesEnum.ACCOUNT_WAITING_PAYMENT],
      eventName: 'status_notifications_transactions_waiting_payment_button_click',
      isHidden: !environment.isWaitingPaymentVisible,
    },
    {
      title: 'fulfilment-submitted',
      iconPath: 'fulfilment-submitted.svg',
      iconSize: { width: 20 },
      notificationsCount: notifications?.ordersFulfillmentCount,
      routerLink: [AppRoutesEnum.ACCOUNT, AppRoutesEnum.ACCOUNT_ORDERS],
      queryParams: { orderStatus: OrderStatusApiEnum.FULFILL },
      eventName: 'status_notifications_transactions_fulfilment-submitted_button_click',
    },
    {
      title: 'order-complete',
      iconPath: 'order-complete.svg',
      iconSize: { width: 20 },
      notificationsCount: notifications?.ordersRecentlyCompletedCount,
      routerLink: [AppRoutesEnum.ACCOUNT, AppRoutesEnum.ACCOUNT_ORDERS],
      queryParams: { orderStatus: OrderStatusApiEnum.COMPLETED },
      eventName: 'status_notifications_transactions_order-complete_button_click',
      isStretchedOnMobile: true,
    },
  ],
  [
    {
      title: 'order-issue',
      iconPath: 'account/issues.svg',
      iconSize: { width: 20 },
      notificationsCount: notifications?.ordersWithIssuesCount,
      routerLink: [AppRoutesEnum.ACCOUNT, AppRoutesEnum.ACCOUNT_ISSUES],
      eventName: 'status_notifications_transactions_order-issue_button_click',
    },
    {
      title: 'my-order',
      iconPath: 'account/orders.svg',
      iconSize: { width: 18, height: 18 },
      routerLink: [AppRoutesEnum.ACCOUNT, AppRoutesEnum.ACCOUNT_ORDERS],
      eventName: 'status_notifications_transactions_my-order_button_click',
    },
  ],
];
