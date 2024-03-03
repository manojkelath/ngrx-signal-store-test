import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CartDetailsModel } from '@features/order-manage/models/view';
import { OrderManageService } from '@features/order-manage/services';

@Component({
  selector: 'kv-cart-product-list-popup-container',
  templateUrl: './cart-product-list-popup-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductListPopupContainerComponent {
  public cart$: Observable<CartDetailsModel> = this.orderManageService.getCartDetailForPreview();

  constructor(private orderManageService: OrderManageService) {}
}
