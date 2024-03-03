import { CategoryDetailsApiModel, OrderConfigurableProductApiModel } from '@features/order/models/api';
import { productRequiresCustomizationFn } from '@features/product-details/utils';
import {
  SubscriptionCategoryDetailsApiModel,
  SubscriptionConfigurableProductApiModel,
} from '@features/subscription/models/api';
import { ProductApiModel } from '@shared/models/product';

export const cartProductRequiresCustomizationFn = (
  product: ProductApiModel,
  categoryDetails: CategoryDetailsApiModel | SubscriptionCategoryDetailsApiModel
): boolean => categoryDetails && productRequiresCustomizationFn(categoryDetails, product);

export const cartProductWithBundleCheckRequiresCustomizationFn = (
  product: ProductApiModel,
  orderConfigurableInformation: OrderConfigurableProductApiModel[] | SubscriptionConfigurableProductApiModel[]
): boolean => {
  const productConfigurableInformation = (orderConfigurableInformation || []).find(
    (orderProductConfigurableInformation) => orderProductConfigurableInformation?.productId === product?.productId
  );

  const productCategoryDetails = productConfigurableInformation?.categoryDetails;

  if (cartProductRequiresCustomizationFn(product, productCategoryDetails)) {
    return true;
  }

  for (const bundle of product?.bundleItem || []) {
    const bundleProductConfigurableInformation = (productConfigurableInformation?.bundleItemDetails || []).find(
      (orderProductConfigurableInformation) => orderProductConfigurableInformation?.productId === bundle?.productId
    )?.categoryDetails;

    if (cartProductRequiresCustomizationFn(bundle, bundleProductConfigurableInformation)) {
      return true;
    }
  }

  return false;
};
