import { select } from '@ngrx/store';

import { AppRoutesEnum } from '@shared/enums';

import { genericRoutesPageChecker } from './router.selectors';

export const selectIsAccountPage = select(genericRoutesPageChecker(AppRoutesEnum.ACCOUNT));

export const selectIsMarketspacePage = select(genericRoutesPageChecker(AppRoutesEnum.PRODUCT));

export const selectIsProductCatalogPage = select(genericRoutesPageChecker(AppRoutesEnum.PRODUCT_CATALOG));

export const selectIsProductCustomizePage = select(genericRoutesPageChecker(AppRoutesEnum.PRODUCT_CONFIGURE));

export const selectIsPaymentPage = select(genericRoutesPageChecker(AppRoutesEnum.PRODUCT_PAYMENT));

export const selectIsOrderConfirmationPage = select(genericRoutesPageChecker(AppRoutesEnum.PRODUCT_CONFIRMATION));

export const selectIsProductCartPage = select(genericRoutesPageChecker(AppRoutesEnum.PRODUCT_CART));

export const selectIsMyAccountProfilePage = select(genericRoutesPageChecker(AppRoutesEnum.ACCOUNT_PROFILE));

export const selectIsOrdersPage = select(genericRoutesPageChecker(AppRoutesEnum.ACCOUNT_ORDERS));

export const selectIsSubscriptionsPage = select(genericRoutesPageChecker(AppRoutesEnum.ACCOUNT_SUBSCRIPTIONS));

export const selectIsIssuesPage = select(genericRoutesPageChecker(AppRoutesEnum.ACCOUNT_ISSUES));

export const selectIsMyAccountBillingPage = select(genericRoutesPageChecker(AppRoutesEnum.ACCOUNT_BILLING));

export const selectIsWaitingPaymentPage = select(genericRoutesPageChecker(AppRoutesEnum.ACCOUNT_WAITING_PAYMENT));

export const selectIsIssueCreatePage = select(genericRoutesPageChecker(AppRoutesEnum.ACCOUNT_ISSUES_CREATE));
