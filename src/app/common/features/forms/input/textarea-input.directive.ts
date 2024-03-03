import { Directive, ElementRef, forwardRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FormControlFieldAbstract } from '@features/forms/form-control';

import { TextInputDirective } from './text-input.directive';

@Directive({
  selector: 'textarea[kvTextareaInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaInputDirective),
      multi: true,
    },
    { provide: FormControlFieldAbstract, useExisting: TextareaInputDirective },
  ],
})
export class TextareaInputDirective
  extends TextInputDirective
  implements FormControlFieldAbstract, ControlValueAccessor
{
  public override isFullHeight = true;

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    super(renderer, elementRef);
  }
}
