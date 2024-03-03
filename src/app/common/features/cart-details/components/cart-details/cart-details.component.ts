import { ConnectedPosition } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';

@Component({
  selector: 'kv-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent {
  @Input()
  public cartProductsAmount: number;

  @Output()
  public cartClickHandler: EventEmitter<void> = new EventEmitter();

  public contentSelectors = ['kv-cart-product-list-popup-container'];
  public isShowCartList = false;
  public connectedPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onCartClick(): void {
    if (this.cartProductsAmount) {
      this.appGoogleAnalyticsService.event({
        event: 'cart_button_click',
        category: GoogleAnalyticsCategoryEnum.GENERAL,
      });

      this.cartClickHandler.emit();
    }
  }

  public onShowCartDetails() {
    this.appGoogleAnalyticsService.event({
      event: `show_cart_list_pop_up_button_hover`,
      category: GoogleAnalyticsCategoryEnum.GENERAL,
    });
    this.isShowCartList = true;
  }

  public onHideCartDetails() {
    this.isShowCartList = false;
  }
}
