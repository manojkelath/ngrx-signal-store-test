import { SubscriptionApiModel } from './subscription-api.model';
import { SubscriptionConfigurableProductApiModel } from './subscription-configurable-product-api.model';

export interface GetSubscriptionResponseApiModel {
  __metadata: any;
  subscription: SubscriptionApiModel;
  configurableProducts: SubscriptionConfigurableProductApiModel[];
}
