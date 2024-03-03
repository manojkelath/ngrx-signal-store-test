import { ProductConfigurationFieldAccessTypeEnum } from '@shared/enums';

export const isProductAttributeInCart = (attribute, productConfigurationAccessRules): boolean =>
  attribute?.configurable &&
  attribute?.showInCart &&
  productConfigurationAccessRules[attribute?.name] !== ProductConfigurationFieldAccessTypeEnum.HIDDEN;

export const isProductAttributeInConfigs = (attribute, productConfigurationAccessRules): boolean =>
  attribute?.configurable &&
  attribute?.showInConfig &&
  productConfigurationAccessRules[attribute?.name] !== ProductConfigurationFieldAccessTypeEnum.HIDDEN;
