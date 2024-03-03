import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { ProductConfigurationModel } from '@features/product-checkout-components/models';
import { PIPE_FORMATS } from '@shared/constants';

@Component({
  selector: 'kv-product-checkout-item',
  templateUrl: './product-checkout-item.component.html',
  styleUrls: ['./product-checkout-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCheckoutItemComponent {
  @Input()
  public product: any;

  @Input()
  public errorMessages: string[];

  @Input()
  public isReadonly: boolean;

  @Input()
  public productConfiguration: ProductConfigurationModel[];

  @Input()
  public cart: any;

  @Input()
  public isConfigurationExpanded = false;

  @Input()
  public isViewConfigurationHighlighted = false;

  @Output()
  public removeAddon: EventEmitter<{ productCode: string; addonId: string }> = new EventEmitter<{
    productCode: string;
    addonId: string;
  }>();

  @Output()
  public editEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  public pipeFormats = PIPE_FORMATS;

  public isRequiredItemsExpanded = true;
  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}

  public onExpand(): void {
    this.appGoogleAnalyticsService.event({
      event: `${this.isConfigurationExpanded ? 'collapse' : 'expand'}_product_configuration_cart_list_button_click`,
      category: this.googleAnalyticsCategoryEnum.CART,
      productCode: this.product.productCode,
    });
    this.isConfigurationExpanded = !this.isConfigurationExpanded;
  }

  public onEdit(): void {
    this.appGoogleAnalyticsService.event({
      event: 'edit_product_cart_button_click',
      category: this.googleAnalyticsCategoryEnum.CART,
      productCode: this.product.productCode,
    });
    this.editEvent.emit();
  }

  public onDelete(): void {
    this.appGoogleAnalyticsService.event({
      event: 'delete_product_cart_button_click',
      category: this.googleAnalyticsCategoryEnum.CART,
      productCode: this.product.productCode,
    });
    this.deleteEvent.emit();
  }

  public onRemoveAddon(addonId, productCode) {
    this.appGoogleAnalyticsService.event({
      event: 'remove_product_addon_button_click',
      category: this.googleAnalyticsCategoryEnum.CART,
      productCode: this.product.productCode,
    });
    this.removeAddon.emit({ productCode, addonId });
  }

  public onExpandRequiredItems(): void {
    this.appGoogleAnalyticsService.event({
      event: `${this.isRequiredItemsExpanded ? 'collapse' : 'expand'}_product_cart_requirement_list_button_click`,
      category: this.googleAnalyticsCategoryEnum.CART,
      productCode: this.product.productCode,
    });
    this.isRequiredItemsExpanded = !this.isRequiredItemsExpanded;
  }
}
