import { ProductCategoryEnum } from '@features/product-checkout-components/enums';
import { ReferenceDataConstants } from '@features/reference-data/constants';

export const getReferenceLocation = (category: ProductCategoryEnum): string => {
  switch (category) {
    case ProductCategoryEnum.PRIME_BUNDLED:
      return ReferenceDataConstants.eppPrimeLocalities;
    case ProductCategoryEnum.CLOUD_VOICE_LITE:
      return ReferenceDataConstants.indLocalities;
    default:
      return ReferenceDataConstants.indAcpCoveredCities;
  }
};
