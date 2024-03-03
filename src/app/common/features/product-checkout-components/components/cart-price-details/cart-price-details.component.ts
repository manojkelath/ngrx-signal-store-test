import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'kv-cart-price-details',
  templateUrl: './cart-price-details.component.html',
  styleUrls: ['./cart-price-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPriceDetailsComponent {
  @Input() public cartPriceDetails = [];
  @Input() public currency: string;
}
