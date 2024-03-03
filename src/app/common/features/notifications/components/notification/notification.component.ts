import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { NotificationTypeEnum } from '@features/notifications/enums';
import { MISSING_TRANSLOCO_KEY } from '@features/translate/constants';

@Component({
  selector: 'kv-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input()
  public text: string | null;

  @Input()
  public translateKey: string | null;

  @Input()
  public type: NotificationTypeEnum = NotificationTypeEnum.ERROR;

  @Input()
  public closable = false;

  @Input()
  public customClass = '';

  @Output()
  public hide: EventEmitter<void> = new EventEmitter();

  public iconByType = {
    [NotificationTypeEnum.ERROR]: 'exclamation-circle.svg',
    [NotificationTypeEnum.WARNING]: 'exclamation-triangle-solid.svg',
    [NotificationTypeEnum.INFO]: 'info-circle-solid.svg',
  };

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  public missingTranslocoKey = MISSING_TRANSLOCO_KEY;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onClose(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_notification_button_click',
      category: this.googleAnalyticsCategoryEnum.GENERAL,
    });
    this.hide.emit();
  }
}
