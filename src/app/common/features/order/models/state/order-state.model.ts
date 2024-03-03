import { OrderApiModel, OrderConfigurableProductApiModel } from '@features/order/models/api';

export interface OrderStateModel {
  order: OrderApiModel;
  orderConfigurableInformation: OrderConfigurableProductApiModel[];
  userHasOrderAfterLogin: boolean;
}
