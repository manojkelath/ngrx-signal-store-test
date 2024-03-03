import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';

@Component({
  selector: 'kv-terms-to-subscribe',
  templateUrl: './terms-to-subscribe.component.html',
  styleUrls: ['./terms-to-subscribe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsToSubscribeComponent {
  @Input() public terms: string;

  @Output() public acceptEvent: EventEmitter<string> = new EventEmitter();

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  public confirmDisabled = true;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onAccept(): void {
    this.appGoogleAnalyticsService.event({
      event: 'accept_terms_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });

    this.acceptEvent.emit(this.terms);
  }

  public checkboxChange(isChecked: boolean): void {
    this.confirmDisabled = !isChecked;
  }
}
