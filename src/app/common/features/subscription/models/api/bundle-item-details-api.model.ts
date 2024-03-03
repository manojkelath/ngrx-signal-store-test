import { CatalogProductResponseApiModel } from './catalog-product-response-api.model';
import { ConfigOptionApiModel } from './config-option-api.model';

export interface BundleItemDetailsApiModel {
  catalogProduct: CatalogProductResponseApiModel;
  categoryDetails: any;
  configOption: ConfigOptionApiModel[];
  productId: string;
  productCode: string;
  __metadata: any;
}
