import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppConfigurationEffects } from '@features/app-configuration/state/effects';
import { appConfigurationFeatureReducer } from '@features/app-configuration/state/reducers';
import { appConfigurationFeatureName } from '@features/app-configuration/state/selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(appConfigurationFeatureName, appConfigurationFeatureReducer),
    EffectsModule.forFeature([AppConfigurationEffects]),
  ],
})
export class AppConfigurationFeatureModule {}
