import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'kv-cart-product-list-popup',
  templateUrl: './cart-product-list-popup.component.html',
  styleUrls: ['./cart-product-list-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductListPopupComponent {
  @Input()
  public cart: any;
}
