import { ConnectedPosition } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { StatusNotificationsTabsEnum } from '@features/status-notifications/enums';
import {
  StatusNotificationsPromotionViewModel,
  StatusNotificationsTabModel,
  StatusNotificationsTransactionsViewModel,
} from '@features/status-notifications/models/view';
import { StatusNotificationsActions } from '@features/status-notifications/state/actions';
import {
  getHasStatusNotifications,
  getStatusNotificationsPromotions,
  getStatusNotificationsTabs,
  getStatusNotificationsTransactions,
} from '@features/status-notifications/state/selectors';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-status-notifications-container',
  templateUrl: './status-notifications-container.component.html',
  styleUrls: ['./status-notifications-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusNotificationsContainerComponent implements OnInit {
  public notificationsTabs$: Observable<StatusNotificationsTabModel[]> = this.store$.pipe(
    select(getStatusNotificationsTabs)
  );
  public transactionsNotifications$: Observable<Array<StatusNotificationsTransactionsViewModel[]>> = this.store$.pipe(
    select(getStatusNotificationsTransactions)
  );
  public promotionsNotifications$: Observable<StatusNotificationsPromotionViewModel[]> = this.store$.pipe(
    select(getStatusNotificationsPromotions)
  );
  public hasStatusNotifications$: Observable<boolean> = this.store$.pipe(select(getHasStatusNotifications));

  public activeTab = StatusNotificationsTabsEnum.TRANSACTIONS;
  public statusNotificationsTabsEnum = StatusNotificationsTabsEnum;

  public contentSelectors = ['.status-notifications'];
  public isShowNotifications = false;
  public connectedPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  private isTouchEvent: boolean;

  constructor(
    private store$: Store<IAppState>,
    private router: Router,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public ngOnInit(): void {
    this.store$.dispatch(StatusNotificationsActions.loadInitiated());
  }

  public onShowNotifications() {
    this.appGoogleAnalyticsService.event({
      event: `show_notifications_pop_up_button_hover`,
      category: GoogleAnalyticsCategoryEnum.GENERAL,
    });
    this.isShowNotifications = true;
  }

  public onHideNotifications() {
    if (!this.isTouchEvent) {
      this.hideNotifications();
    }
  }

  public onNotificationClicked(item: StatusNotificationsTransactionsViewModel) {
    this.appGoogleAnalyticsService.event({
      event: item.eventName,
      category: GoogleAnalyticsCategoryEnum.STATUS_NOTIFICATIONS,
    });

    this.router.navigate(item.routerLink, { queryParams: item.queryParams });

    this.hideNotifications();
  }

  public onTabClicked(tab: StatusNotificationsTabsEnum) {
    if (this.isTouchEvent && !tab) {
      this.hideNotifications();
    }

    const activeTab = tab || StatusNotificationsTabsEnum.TRANSACTIONS;

    this.appGoogleAnalyticsService.event({
      event: `notifications_pop_up_${activeTab.toLowerCase()}_tab_clicked`,
      category: GoogleAnalyticsCategoryEnum.STATUS_NOTIFICATIONS,
    });

    this.activeTab = activeTab;
  }

  public touchDownShowNotifications(_event: any) {
    this.isTouchEvent = true;
  }

  public touchUpShowNotifications(_event: any) {
    this.isTouchEvent = true;
  }

  public touchLeaveShowNotifications(_event: any) {
    this.isTouchEvent = true;
  }

  private hideNotifications() {
    this.isShowNotifications = false;
  }
}
