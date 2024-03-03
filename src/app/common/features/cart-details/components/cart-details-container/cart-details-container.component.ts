import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { OrderManageService } from '@features/order-manage/services';
import { AppRoutesEnum } from '@shared/enums';

@Component({
  selector: 'kv-cart-details-container',
  templateUrl: './cart-details-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsContainerComponent {
  public cartProductsAmount$ = this.orderManageService.getCartProductsAmount();

  constructor(private orderManageService: OrderManageService, private router: Router) {}

  public onCartClick(): void {
    this.router.navigate([AppRoutesEnum.PRODUCT, AppRoutesEnum.PRODUCT_CART]);
  }
}
