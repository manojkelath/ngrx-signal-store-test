import { ProductTag } from '@features/product-checkout-components/enums';

export const productHasRequestDetailsAction = (product): boolean =>
  (product?.productTag || []).includes(ProductTag.REGONLY);
