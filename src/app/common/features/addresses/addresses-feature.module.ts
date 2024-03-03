import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AddressesEffects, AddressReferencesEffects } from './state/effects';
import { addressesFeatureReducer } from './state/reducers';
import { addressesFeatureName } from './state/selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(addressesFeatureName, addressesFeatureReducer),
    EffectsModule.forFeature([AddressesEffects, AddressReferencesEffects]),
  ],
})
export class AddressesFeatureModule {}
