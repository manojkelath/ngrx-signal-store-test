import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckboxBaseComponent } from '@shared/components/checkbox-base';

import { CheckboxComponent } from './checkbox.component';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule, CheckboxBaseComponent],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
