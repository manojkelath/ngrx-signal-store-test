import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';

@Component({
  standalone: true,
  selector: 'kv-toggle[googleAnalyticsCategory][label]',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent {
  @Input() public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input() public label: string;

  @Input() public isDisabled = false;

  @Input() public isReadonly = false;

  @Input() public value: boolean;

  @Input() public handleOnClick: boolean;

  @Output() public changeEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onChanged(event) {
    this.appGoogleAnalyticsService.event({
      event: `toggle_${this.label}_switch_${this.googleAnalyticsCategory}`,
      category: this.googleAnalyticsCategory,
    });

    if (!this.isDisabled && !this.handleOnClick) {
      this.value = event.target.checked;
      this.changeEvent.emit(this.value);
    }
  }
}
