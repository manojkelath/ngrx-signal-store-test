import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';

@Component({
  selector: 'kv-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddonsComponent {
  @Input()
  public isReadonly: boolean;

  @Input()
  public subtotalValue = 0;

  @Input()
  public addons = [];

  @Output()
  public removeAddon: EventEmitter<string> = new EventEmitter<string>();

  public isAddonsExpanded = true;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onExpand() {
    this.appGoogleAnalyticsService.event({
      event: `${this.isAddonsExpanded ? 'collapse' : 'expand'}_addons_cart_list_button_click`,
      category: this.googleAnalyticsCategoryEnum.CART,
    });
    this.isAddonsExpanded = !this.isAddonsExpanded;
  }

  public onRemoveAddon(id) {
    this.removeAddon.emit(id);
  }
}
