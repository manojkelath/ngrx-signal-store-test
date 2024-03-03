import { BundleItemDetailsApiModel } from './bundle-item-details-api.model';
import { CategoryDetailsApiModel } from './category-details-api.model';
import { ConfigOptionApiModel } from './config-option-api.model';

export interface OrderConfigurableProductApiModel {
  bundleItemDetails?: BundleItemDetailsApiModel[];
  categoryDetails: CategoryDetailsApiModel;
  configOption: ConfigOptionApiModel[];
  isConfigurable: boolean;
  productCode: string;
  productId: string;
  __metadata: any; // TODO: add type
}
