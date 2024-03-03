import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';

@Component({
  selector: 'kv-bundle-items',
  templateUrl: './bundle-items.component.html',
  styleUrls: ['./bundle-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleItemsComponent {
  @Input() public bundle = [];

  public isExpanded = true;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onExpand() {
    this.appGoogleAnalyticsService.event({
      event: `${this.isExpanded ? 'collapse' : 'expand'}_bundle_items_cart_list_button_click`,
      category: this.googleAnalyticsCategoryEnum.CART,
    });
    this.isExpanded = !this.isExpanded;
  }
}
