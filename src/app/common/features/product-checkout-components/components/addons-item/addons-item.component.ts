import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';

@Component({
  selector: 'kv-addons-item',
  templateUrl: './addons-item.component.html',
  styleUrls: ['./addons-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddonsItemComponent {
  @Input()
  public titleText: string;

  @Input()
  public priceValue: number;

  @Input()
  public isDeletable = true;

  @Input()
  public isReadonly: boolean;

  @Output()
  public removeAddon: EventEmitter<void> = new EventEmitter<void>();

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onRemoveAddon() {
    this.appGoogleAnalyticsService.event({
      event: 'remove_cart_addon_button_click',
      category: this.googleAnalyticsCategoryEnum.CART,
    });
    this.removeAddon.emit();
  }
}
