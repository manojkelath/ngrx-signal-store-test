import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AdditionalInformationEffects } from '@features/additional-information/state/effects';
import { additionalInformationFeatureReducers } from '@features/additional-information/state/reducers';
import { additionalInformationFeatureName } from '@features/additional-information/state/selectors';
import { AppGaEventDirective } from '@features/app-google-analytics/directives';
import { CustomSelectModule } from '@features/custom-select';
import { ErrorHandlerModule } from '@features/error-handler';
import { FilesFeatureModule } from '@features/files';
import { CheckboxModule } from '@features/forms/checkbox';
import { DatepickerComponent } from '@features/forms/datepicker';
import { FormControlModule } from '@features/forms/form-control';
import { InputModule } from '@features/forms/input';
import { SelectModule } from '@features/select';
import { SpinnerModule } from '@features/spinner';
import { IconComponent } from '@shared/components/icon';

import {
  AddUserIdentificationComponent,
  AddUserIdentificationContainerComponent,
  AddUserIdentificationFormComponent,
  AddUserIdentificationFormContainerComponent,
  AddUserIdentificationFormOverlayWrapperContainerComponent,
} from './components';

@NgModule({
  declarations: [
    AddUserIdentificationFormContainerComponent,
    AddUserIdentificationContainerComponent,
    AddUserIdentificationFormComponent,
    AddUserIdentificationComponent,
    AddUserIdentificationFormOverlayWrapperContainerComponent,
  ],
  imports: [
    StoreModule.forFeature(additionalInformationFeatureName, additionalInformationFeatureReducers),
    EffectsModule.forFeature([AdditionalInformationEffects]),
    IconComponent,
    TranslocoModule,
    SpinnerModule,
    ErrorHandlerModule,
    FilesFeatureModule,
    FormControlModule,
    CommonModule,
    InputModule,
    ReactiveFormsModule,
    CustomSelectModule,
    SelectModule,
    CheckboxModule,
    AppGaEventDirective,
    DatepickerComponent,
  ],
  exports: [AddUserIdentificationFormContainerComponent, AddUserIdentificationFormOverlayWrapperContainerComponent],
})
export class AddUserIdentificationFeatureModule {}
