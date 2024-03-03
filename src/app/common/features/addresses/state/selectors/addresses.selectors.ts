import { createSelector } from '@ngrx/store';

import { RouteParamsEnum } from '@shared/enums';
import { getOrderedItemsFromState, selectRouteParamFactory } from '@shared/state/selectors';

import { getAddressesFeatureState } from './addresses-base.selectors';

export const getAddressesItems = createSelector(getAddressesFeatureState, (state) => state?.items);

export const getAddressesOrder = createSelector(getAddressesFeatureState, (state) => state?.order);

export const getAddressesList = createSelector(getAddressesFeatureState, getOrderedItemsFromState);

export const getAddressesCount = createSelector(getAddressesOrder, (order) => order?.length);

export const getAddressById = createSelector(
  selectRouteParamFactory(RouteParamsEnum.ADDRESS_ID),
  getAddressesItems,
  (id, items) => (id && items?.[id]) || null
);

export const getFirstAddressLocation = createSelector(getAddressesItems, getAddressesOrder, (items, order) =>
  order?.length ? items?.[order[0]] : null
);

export const getIsAddressesLoaded = createSelector(getAddressesFeatureState, (state) => state?.isLoaded);
