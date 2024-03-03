import { ProductApiModel } from '@shared/models/product';

export interface CatalogProductResponseApiModel {
  categoryPath: any[];
  product: string;
  productInfo: ProductApiModel;
  __metadata: any;
}
