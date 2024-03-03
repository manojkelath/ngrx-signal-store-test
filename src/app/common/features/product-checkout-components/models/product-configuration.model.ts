import { ProductConfigurationListModel } from './product-configuration-list.model';

export interface ProductConfigurationModel {
  productName: string;
  productCode: string;
  configurationList: ProductConfigurationListModel[];
}
