import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormControlModule } from '@features/forms/form-control';
import { IconComponent } from '@shared/components/icon';

import { CustomSelectComponent } from './custom-select.component';
import { CustomSelectDropdownComponent } from './custom-select-dropdown.component';
import { CustomSelectInputDirective } from './custom-select-input.directive';
import { CustomSelectOptionComponent } from './custom-select-option.component';

@NgModule({
  declarations: [
    CustomSelectOptionComponent,
    CustomSelectDropdownComponent,
    CustomSelectComponent,
    CustomSelectInputDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    A11yModule,
    OverlayModule,
    PortalModule,
    FormControlModule,
    IconComponent,
  ],
  exports: [CustomSelectOptionComponent, CustomSelectComponent],
})
export class CustomSelectModule {}
