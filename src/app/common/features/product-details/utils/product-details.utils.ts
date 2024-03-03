import { ProductCategoryEnum } from '@features/product-checkout-components/enums';
import { ProductConfigurationFieldAccessTypeEnum } from '@shared/enums';
import { ProductApiModel } from '@shared/models/product';

export const productRequiresCustomizationFn = (productCategoryDetails: any, product: ProductApiModel): boolean => {
  const productAccessRules = product?.__metadata?.access || {};

  const isShowConfigInCategoryAttribute = (productCategoryDetails.categoryAttribute || []).find(
    (categoryAttribute) =>
      categoryAttribute?.showInConfig &&
      categoryAttribute?.configurable &&
      productAccessRules[categoryAttribute?.name] !== ProductConfigurationFieldAccessTypeEnum.HIDDEN
  );

  if (isShowConfigInCategoryAttribute) {
    return true;
  }

  const isConfigurableInInheritedAttribute = (productCategoryDetails.inheritedAttribute || []).find(
    (inheritedAttribute) =>
      inheritedAttribute?.showInConfig &&
      inheritedAttribute?.configurable &&
      productAccessRules[inheritedAttribute?.name] !== ProductConfigurationFieldAccessTypeEnum.HIDDEN
  );

  if (isConfigurableInInheritedAttribute) {
    return true;
  }

  return false;
};

export const productPhoneNumberTypeFn = (productCategory: ProductCategoryEnum) => {
  switch (productCategory) {
    case ProductCategoryEnum.CLOUD_VOICE_LITE:
      return 'CVL';
    case ProductCategoryEnum.EMPLOYEE_PURCHASE_PROGRAM:
      return 'EPP';
    default:
      return 'DEFAULT';
  }
};
