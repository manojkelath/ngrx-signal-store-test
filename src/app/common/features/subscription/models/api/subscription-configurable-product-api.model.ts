import { BundleItemDetailsApiModel } from './bundle-item-details-api.model';
import { ConfigOptionApiModel } from './config-option-api.model';

export interface SubscriptionConfigurableProductApiModel {
  bundleItemDetails?: BundleItemDetailsApiModel[];
  categoryDetails: any;
  configOption: ConfigOptionApiModel[];
  isConfigurable: boolean;
  productCode: string;
  productId: string;
  __metadata: any; // TODO: add type
}
