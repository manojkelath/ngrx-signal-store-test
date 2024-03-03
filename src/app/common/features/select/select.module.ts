import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormControlModule } from '@features/forms/form-control';
import { IconComponent } from '@shared/components/icon';

import { SelectComponent } from './select.component';
import { SelectDropdownComponent } from './select-dropdown.component';
import { SelectInputDirective } from './select-input.directive';
import { SelectOptionComponent } from './select-option.component';

@NgModule({
  declarations: [SelectOptionComponent, SelectDropdownComponent, SelectComponent, SelectInputDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    A11yModule,
    OverlayModule,
    PortalModule,
    FormControlModule,
    IconComponent,
  ],
  exports: [SelectOptionComponent, SelectComponent, SelectDropdownComponent],
})
export class SelectModule {}
