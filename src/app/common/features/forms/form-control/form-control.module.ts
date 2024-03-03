import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconComponent } from '@shared/components/icon';

import { FormControlComponent } from './form-control.component';

@NgModule({
  declarations: [FormControlComponent],
  imports: [CommonModule, IconComponent],
  exports: [FormControlComponent],
})
export class FormControlModule {}
