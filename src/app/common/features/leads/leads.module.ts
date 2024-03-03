import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { LetModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppGaEventDirective } from '@features/app-google-analytics/directives';
import { CustomSelectModule } from '@features/custom-select';
import { FormControlModule } from '@features/forms/form-control';
import { InputModule } from '@features/forms/input';
import { SelectModule } from '@features/select';
import { IconComponent } from '@shared/components/icon';
import { FilterPipe } from '@shared/pipes';

import {
  LeadRegisterButtonComponent,
  LeadRegisterContainerComponent,
  LeadRegisterFormComponent,
  LeadRegisterFormContainerComponent,
} from './components';
import { LeadRegisterEffects } from './state/effects';
import { LeadFormEffects } from './state/effects/lead-form.effects';
import { leadsFeatureReducer } from './state/reducers';
import { leadsFeatureName } from './state/selectors';

@NgModule({
  declarations: [
    LeadRegisterButtonComponent,
    LeadRegisterContainerComponent,
    LeadRegisterFormComponent,
    LeadRegisterFormContainerComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([LeadRegisterEffects, LeadFormEffects]),
    StoreModule.forFeature(leadsFeatureName, leadsFeatureReducer),
    TranslocoModule,
    IconComponent,
    LetModule,
    ReactiveFormsModule,
    FormControlModule,
    InputModule,
    SelectModule,
    FilterPipe,
    FormsModule,
    CustomSelectModule,
    AppGaEventDirective,
  ],
  exports: [LeadRegisterContainerComponent],
})
export class LeadsFeatureModule {}
