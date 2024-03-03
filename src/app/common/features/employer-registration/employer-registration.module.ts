import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { LetModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AddUserIdentificationFeatureModule } from '@features/additional-information';
import { AppGaEventDirective } from '@features/app-google-analytics/directives';
import { CustomSelectModule } from '@features/custom-select';
import { ErrorHandlerModule } from '@features/error-handler';
import { FormControlModule } from '@features/forms/form-control';
import { InputModule } from '@features/forms/input';
import { SelectModule } from '@features/select';
import { IconComponent } from '@shared/components/icon';

import { EmployerRegistrationComponent, EmployerRegistrationContainerComponent } from './components';
import { EmployerRegistrationEffects, EmployerRegistrationModalEffects } from './state/effects';
import { employerRegistrationFeatureReducer } from './state/reducers';
import { employerRegistrationFeatureName } from './state/selectors';

@NgModule({
  declarations: [EmployerRegistrationContainerComponent, EmployerRegistrationComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([EmployerRegistrationEffects, EmployerRegistrationModalEffects]),
    StoreModule.forFeature(employerRegistrationFeatureName, employerRegistrationFeatureReducer),
    LetModule,
    IconComponent,
    ReactiveFormsModule,
    FormControlModule,
    SelectModule,
    CustomSelectModule,
    TranslocoModule,
    InputModule,
    ErrorHandlerModule,
    AddUserIdentificationFeatureModule,
    AppGaEventDirective,
  ],
})
export class EmployerRegistrationFeatureModule {}
