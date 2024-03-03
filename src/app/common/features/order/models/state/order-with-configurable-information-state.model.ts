import { OrderApiModel, OrderConfigurableProductApiModel } from '@features/order/models/api';
import { SubscriptionApiModel } from '@features/subscription/models/api';

export interface OrderWithConfigurableInformationStateModel {
  order?: OrderApiModel;
  subscriptionOrder?: SubscriptionApiModel;
  orderConfigurableInformation: OrderConfigurableProductApiModel[];
}
