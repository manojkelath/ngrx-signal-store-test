import { createSelector } from '@ngrx/store';

import { getIsUserVerified } from '@features/auth/state/selectors';
import { AppRoutesEnum } from '@shared/enums';
import { genericRoutesPageChecker } from '@shared/state/selectors';

export const selectLeadRegisterFeatureState = createSelector(
  genericRoutesPageChecker(AppRoutesEnum.PRODUCT_CATALOG),
  getIsUserVerified,
  (isProductCatalogPage, isUserVerified) => isProductCatalogPage && !isUserVerified
);
