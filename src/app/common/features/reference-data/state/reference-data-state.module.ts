import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { REFERENCE_DATA_STATE_FEATURE } from './constants';
import {
  DynamicReferenceDataLoadEffects,
  LanguageDynamicReferenceDataLoadEffects,
  StaticReferenceDataLoadEffects,
} from './effects';
import { referenceDataFeatureReducers } from './reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(REFERENCE_DATA_STATE_FEATURE, referenceDataFeatureReducers),
    EffectsModule.forFeature([
      StaticReferenceDataLoadEffects,
      DynamicReferenceDataLoadEffects,
      LanguageDynamicReferenceDataLoadEffects,
    ]),
  ],
})
export class ReferenceDataStateModule {}
