import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PaymentInstructionsComponent } from '@features/payment-instructions/components';
import { IconComponent } from '@shared/components/icon';

import { PaymentInstructionsEffects } from './state/effects';
import { paymentInstructionsFeatureReducer } from './state/reducers';
import { paymentInstructionsFeatureName } from './state/selectors';

@NgModule({
  declarations: [PaymentInstructionsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(paymentInstructionsFeatureName, paymentInstructionsFeatureReducer),
    EffectsModule.forFeature([PaymentInstructionsEffects]),
    IconComponent,
    TranslocoModule,
  ],
  exports: [PaymentInstructionsComponent],
})
export class PaymentInstructionsFeatureModule {}
