import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { AppNavEffects } from './state/effects';

@NgModule({
  imports: [EffectsModule.forFeature([AppNavEffects])],
})
export class AppNavFeatureModule {}
