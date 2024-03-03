import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { ACPCodeEffects } from './state/effects';

@NgModule({
  imports: [EffectsModule.forFeature([ACPCodeEffects])],
})
export class ACPCodeFeatureModule {}
