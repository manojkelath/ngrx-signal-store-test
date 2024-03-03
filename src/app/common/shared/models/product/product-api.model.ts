import { ProductConfigurationFieldAccessTypeEnum } from '@shared/enums';

import { ProductConfigurationApiModel } from './product-configuration-api.model';

export interface ProductApiModel {
  productCode: string;
  productCategory: string;
  productCatalog: string;
  description: string;
  regularPrice: number;
  itemTotal: number;
  taxTotal: number;
  unitPrice: number;
  recurrence: string;
  priceCode: string;
  rulePriceCode: string;
  title: string;
  taxExempt: boolean;
  quantity: number;
  currency: string;
  tax?: any[];
  configuration: ProductConfigurationApiModel;
  shipToAddressId: string;
  productIdentifier?: any[];
  priceIdentifier?: any[];
  priceBreakdown?: any[];
  productId: string;
  productType: string;
  smallImage: string;
  limit: number;
  quantityDiscount: boolean;
  fractionalQuantity: boolean;
  shippable: boolean;
  bundleTotal: number;
  bundleTaxTotal: number;
  productTag?: string[];
  bundleItem?: any[];
  addOnItem?: any[];
  subscriptionType: string;
  $subscriptionType: string;
  allowSchedule: boolean;
  needAttention: boolean;
  subscriptionTypeDescription: string;
  addOn: boolean;
  needConfiguration: boolean;
  subscriptionStartDate: string;
  skipSubscriptionFulfillment: boolean;
  skipSubscriptionCheckout: boolean;
  skipSubscriptionCreate: boolean;
  subscriptionAutoPayment: boolean;
  charge: any[];
  // TODO: create interface
  __metadata: {
    access: Record<string, ProductConfigurationFieldAccessTypeEnum>;
  };
}
