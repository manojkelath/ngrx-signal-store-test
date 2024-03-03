import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { StatusNotificationsTabsEnum } from '@features/status-notifications/enums';
import { StatusNotificationsTabModel } from '@features/status-notifications/models/view';

@Component({
  selector: 'kv-status-notifications-tabs',
  templateUrl: './status-notifications-tabs.component.html',
  styleUrls: ['./status-notifications-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusNotificationsTabsComponent implements OnDestroy {
  @Input()
  public tabs: StatusNotificationsTabModel[];

  @Input()
  public activeTab: StatusNotificationsTabsEnum = StatusNotificationsTabsEnum.TRANSACTIONS;

  @Output()
  public tabClicked: EventEmitter<StatusNotificationsTabsEnum> = new EventEmitter<StatusNotificationsTabsEnum>();

  public selectTab(tab: StatusNotificationsTabsEnum): void {
    this.tabClicked.emit(tab);
  }

  public ngOnDestroy() {
    this.tabClicked.emit(undefined);
  }
}
