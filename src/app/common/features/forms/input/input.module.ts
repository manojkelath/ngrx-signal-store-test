import { NgModule } from '@angular/core';

import { InputFormattersModule } from '@features/forms/input-formatters';

import { HiddenTextInputDirective } from './hidden-text-input.directive';
import { NumberInputDirective } from './number-input.directive';
import { TextInputDirective } from './text-input.directive';
import { TextareaInputDirective } from './textarea-input.directive';

@NgModule({
  declarations: [NumberInputDirective, TextInputDirective, TextareaInputDirective, HiddenTextInputDirective],
  exports: [
    NumberInputDirective,
    TextInputDirective,
    TextareaInputDirective,
    HiddenTextInputDirective,
    InputFormattersModule,
  ],
})
export class InputModule {}
