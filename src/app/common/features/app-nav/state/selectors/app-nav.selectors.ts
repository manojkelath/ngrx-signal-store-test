import { createSelector } from '@ngrx/store';

import { getShopConfiguration } from '@features/app-configuration/state/selectors';
import { getAppNavExternalLinks } from '@features/app-nav/utils';

export const getAppNavItems = createSelector(getShopConfiguration, (configuration) =>
  configuration ? getAppNavExternalLinks(configuration) : []
);
