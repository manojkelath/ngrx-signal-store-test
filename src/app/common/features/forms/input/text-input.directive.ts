import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

import { FormControlFieldAbstract } from '@features/forms/form-control';

@Directive({
  selector: 'input[kvTextInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputDirective),
      multi: true,
    },
    { provide: FormControlFieldAbstract, useExisting: TextInputDirective },
  ],
})
export class TextInputDirective implements FormControlFieldAbstract, ControlValueAccessor {
  public isDisabled = false;
  public isFullHeight = false;
  public empty = true;
  public focused = false;

  public stateChanges: Subject<void> = new Subject();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  public onInput = (_: any) => {};

  @HostListener('blur', ['$event.target.value'])
  public onBlur(): void {
    this.focused = false;
    this.stateChanges.next();
  }

  @HostListener('focus', ['$event.target.value'])
  public onFocus(): void {
    this.focused = true;
    this.stateChanges.next();
  }

  public writeValue(value: string): void {
    this.empty = !value;
    this.stateChanges.next();
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onInput = (value: string) => {
      this.empty = !value;

      fn(value);
    };
  }

  public setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    this.stateChanges.next();
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  public registerOnTouched(): void {}
}
