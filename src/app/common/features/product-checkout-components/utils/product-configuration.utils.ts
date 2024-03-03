import RisNil from 'ramda/es/isNil';

import { NO_PRODUCT_CONFIGURATION_VALUE } from '@features/product-checkout-components/constants';

export const mapProductConfigurationValue = (productConfiguration, name) => {
  if (RisNil(productConfiguration[name])) {
    return NO_PRODUCT_CONFIGURATION_VALUE;
  }

  if (Array.isArray(productConfiguration[name])) {
    return productConfiguration[name].join(', ');
  }

  if (productConfiguration[`${name}_unit`]) {
    return `${productConfiguration[name]} ${productConfiguration[`${name}_unit`]}`;
  }

  return productConfiguration[name];
};
