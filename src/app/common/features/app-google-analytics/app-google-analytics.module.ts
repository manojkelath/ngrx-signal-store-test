import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { AppGoogleAnalyticsEffects } from './state/effects';

@NgModule({
  imports: [EffectsModule.forFeature([AppGoogleAnalyticsEffects])],
})
export class AppGoogleAnalyticsFeatureModule {}
