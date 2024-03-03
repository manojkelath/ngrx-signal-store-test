import { createFeatureSelector } from '@ngrx/store';

import { AddressesFeatureStateModel } from '@features/addresses/models/state';

export const addressesFeatureName = 'addressesFeature';
export const getAddressesFeatureState = createFeatureSelector<AddressesFeatureStateModel>(addressesFeatureName);
