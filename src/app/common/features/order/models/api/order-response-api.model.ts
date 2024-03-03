import { OrderApiModel } from './order-api.model';
import { OrderConfigurableProductApiModel } from './order-configurable-product-api.model';

export interface OrderResponseApiModel {
  configurableProducts: OrderConfigurableProductApiModel[];
  order: OrderApiModel;
}
