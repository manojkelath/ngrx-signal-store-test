import { CatalogProductResponseApiModel } from './catalog-product-response-api.model';
import { CategoryDetailsApiModel } from './category-details-api.model';
import { ConfigOptionApiModel } from './config-option-api.model';

export interface BundleItemDetailsApiModel {
  catalogProduct: CatalogProductResponseApiModel;
  categoryDetails: CategoryDetailsApiModel;
  configOption: ConfigOptionApiModel[];
  productId: string;
  productCode: string;
  __metadata: any;
}
