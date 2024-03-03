import { OrderApiModel } from './order-api.model';
import { OrderConfigurableProductApiModel } from './order-configurable-product-api.model';

export interface DeleteOrderResponseApiModel {
  code: number;
  configurableProducts: OrderConfigurableProductApiModel[];
  message: string;
  order: OrderApiModel;
}
