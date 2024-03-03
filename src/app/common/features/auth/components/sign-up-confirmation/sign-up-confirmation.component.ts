import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { environment } from '@environment';

import { RegistrationModelEnum } from '@features/app-configuration/enums';
import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';

@Component({
  selector: 'kv-sign-up-confirmation',
  templateUrl: './sign-up-confirmation.component.html',
  styleUrls: ['./sign-up-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpConfirmationComponent {
  @Input() public registrationModel: RegistrationModelEnum;

  @Output() public closeModal: EventEmitter<void> = new EventEmitter<void>();

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;
  public successUrl = `${environment.assetsFolder}images/reg-successful.png`;

  public ahModel = RegistrationModelEnum.AH;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onModalClose(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_success_registration_modal_button_click',
      category: this.googleAnalyticsCategoryEnum.AUTH,
    });
    this.closeModal.emit();
  }
}
