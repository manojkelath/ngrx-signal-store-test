import { CartPriceModel } from './cart-price.model';
import { CartProductModel } from './cart-product.model';

export interface CartDetailsModel {
  products: CartProductModel[];
  cartPrice: CartPriceModel;
}
