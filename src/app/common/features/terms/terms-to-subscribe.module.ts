import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';

import { AppGaEventDirective } from '@features/app-google-analytics/directives';
import { CheckboxBaseComponent } from '@shared/components/checkbox-base';

import { TermsFromHtmlComponent, TermsToSubscribeComponent, TermsToSubscribeContainerComponent } from './components';
import { TermsToSubscribeEffects } from './state/effects';

@NgModule({
  declarations: [TermsToSubscribeContainerComponent, TermsToSubscribeComponent, TermsFromHtmlComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([TermsToSubscribeEffects]),
    TranslocoModule,
    CheckboxBaseComponent,
    AppGaEventDirective,
  ],
})
export class TermsModule {}
