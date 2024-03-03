import { Directive, HostListener, Input } from '@angular/core';

import { AppGoogleAnalyticsEventDirectiveModel } from '@features/app-google-analytics/models';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { mapAppGaEventDirectiveToPayload } from '@features/app-google-analytics/utils';

@Directive({
  selector: '[kvGaEvent]',
  standalone: true,
})
export class AppGaEventDirective {
  @Input()
  public kvGaEvent: AppGoogleAnalyticsEventDirectiveModel;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  @HostListener('blur')
  public onBlur() {
    if (this.kvGaEvent.eventType === 'blur') {
      this.appGoogleAnalyticsService.event(mapAppGaEventDirectiveToPayload(this.kvGaEvent));
    }
  }

  @HostListener('click')
  public onClick() {
    if (this.kvGaEvent.eventType === 'click') {
      this.appGoogleAnalyticsService.event(mapAppGaEventDirectiveToPayload(this.kvGaEvent));
    }
  }

  @HostListener('change')
  public onChange() {
    if (this.kvGaEvent.eventType === 'change') {
      this.appGoogleAnalyticsService.event(mapAppGaEventDirectiveToPayload(this.kvGaEvent));
    }
  }
}
