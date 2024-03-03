import { ProductConfigurationOptionApiModel } from './product-configuration-option-api.model';

export interface ProductConfigurationApiModel {
  productCode: string;
  productType: string;
  catalog: string;
  categoryId: string;
  createdDate: string;
  createdBy: string;
  $createdBy: string;
  updatedBy: string;
  $updatedBy: string;
  lastUpdated: string;
  configOption?: ProductConfigurationOptionApiModel[];
  productTag?: string[];
  businessUnit: string;
  $businessUnit: string;
  productFamily: string;
  $productFamily: string;
  mainQuota: number;
  applicationsQuota: number;
  voiceIndosat: string;
  voiceOtherOperator: number;
  officeQuota: number;
  location: string;
  $location: string;
  useCustomerAddress: boolean;
  __metadata: any;
}
