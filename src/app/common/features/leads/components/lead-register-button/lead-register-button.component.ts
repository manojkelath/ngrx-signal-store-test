import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';

@Component({
  selector: 'kv-lead-register-button',
  templateUrl: './lead-register-button.component.html',
  styleUrls: ['./lead-register-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadRegisterButtonComponent {
  @Output() public buttonClickEvent: EventEmitter<void> = new EventEmitter<void>();

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onClick() {
    this.appGoogleAnalyticsService.event({
      event: 'open_lead_register_button_click',
      category: this.googleAnalyticsCategoryEnum.LEADS,
    });
    this.buttonClickEvent.emit();
  }
}
