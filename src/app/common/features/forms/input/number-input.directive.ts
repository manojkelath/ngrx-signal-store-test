import { Directive, ElementRef, forwardRef, HostListener, Input, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

import { FormControlFieldAbstract } from '@features/forms/form-control';
import { formattedStringToNumber, numberFormatter } from '@shared/utils';

@Directive({
  selector: 'input[kvNumberInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputDirective),
      multi: true,
    },
    { provide: FormControlFieldAbstract, useExisting: NumberInputDirective },
  ],
})
export class NumberInputDirective implements FormControlFieldAbstract, ControlValueAccessor {
  @Input()
  public formatted = true;

  public isDisabled = false;
  public isFullHeight = false;
  public empty = true;
  public focused = false;

  public stateChanges: Subject<void> = new Subject();

  constructor(protected renderer: Renderer2, protected elementRef: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  public onInput = (_: any) => {};

  @HostListener('blur', ['$event.target.value'])
  public onBlur(value: string): void {
    this.focused = false;
    this.stateChanges.next();

    this.formatAndUpdate(value);
  }

  @HostListener('focus', ['$event.target.value'])
  public onFocus(): void {
    this.focused = true;
    this.stateChanges.next();
  }

  public writeValue(value: string): void {
    this.empty = !value;
    this.stateChanges.next();

    this.formatAndUpdate(value);
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onInput = (value: string) => {
      this.empty = !value;

      fn(formattedStringToNumber(this.formatter(value)));
    };
  }

  public setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    this.stateChanges.next();
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  public registerOnTouched(): void {}

  public formatAndUpdate(value: string) {
    const uiValue = this.formatter(value);
    this.empty = !uiValue;

    this.renderer.setProperty(this.elementRef.nativeElement, 'value', uiValue);
  }

  public formatter(value: string | number): string | number {
    return this.formatted ? numberFormatter(value) : value;
  }
}
