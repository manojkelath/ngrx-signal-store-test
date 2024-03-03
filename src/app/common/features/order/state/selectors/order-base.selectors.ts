import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrderFeatureStateModel } from '@features/order/models/state';

export const orderFeatureName = 'orderFeature';

export const getOrderFeatureState = createFeatureSelector<OrderFeatureStateModel>(orderFeatureName);

export const getOrderState = createSelector(getOrderFeatureState, (state) => state?.order);
