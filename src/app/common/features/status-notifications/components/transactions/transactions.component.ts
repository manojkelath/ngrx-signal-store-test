import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StatusNotificationsTransactionsViewModel } from '@features/status-notifications/models/view';

@Component({
  selector: 'kv-status-notifications-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  @Input()
  public notifications: Array<StatusNotificationsTransactionsViewModel[]>;

  @Output()
  public notificationClicked: EventEmitter<StatusNotificationsTransactionsViewModel> = new EventEmitter<StatusNotificationsTransactionsViewModel>();

  public onNotificationClick(item: StatusNotificationsTransactionsViewModel) {
    this.notificationClicked.emit(item);
  }
}
