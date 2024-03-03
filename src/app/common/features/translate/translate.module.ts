import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TranslateEffects } from '@features/translate/state/effects';

import { translateFeatureReducers } from './state/reducers';
import { translateFeatureName } from './state/selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(translateFeatureName, translateFeatureReducers),
    EffectsModule.forFeature([TranslateEffects]),
  ],
})
export class TranslateFeatureModule {}
