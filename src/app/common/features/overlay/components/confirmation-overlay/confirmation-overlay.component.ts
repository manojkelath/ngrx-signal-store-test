import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { IConfirmationOverlayDataModel } from '@features/overlay/models';
import { ModalOverlayService } from '@features/overlay/services';

@Component({
  selector: 'kv-confirmation-overlay',
  templateUrl: './confirmation-overlay.component.html',
  styleUrls: ['./confirmation-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationOverlayComponent {
  @Input()
  public data: IConfirmationOverlayDataModel;

  constructor(
    private overlayService: ModalOverlayService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onCancel(): void {
    this.appGoogleAnalyticsService.event({
      event: `cancel_${this.data.googleAnalyticsEventName}_confirmation_modal_button_click`,
      category: this.data.googleAnalyticsCategory,
    });

    this.overlayService.closeModal(false);
  }

  public onConfirm(): void {
    this.appGoogleAnalyticsService.event({
      event: `confirm_${this.data.googleAnalyticsEventName}_confirmation_modal_button_click`,
      category: this.data.googleAnalyticsCategory,
    });

    this.overlayService.closeModal(true);
  }

  public onCloseModal(): void {
    this.appGoogleAnalyticsService.event({
      event: `close_${this.data.googleAnalyticsEventName}_confirmation_modal_button_click`,
      category: this.data.googleAnalyticsCategory,
    });

    this.overlayService.closeModal(null);
  }
}
