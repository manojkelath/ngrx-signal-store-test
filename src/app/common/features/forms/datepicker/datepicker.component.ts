import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { FormControlModule } from '@features/forms/form-control';

import { DatepickerInnerComponent } from './datepicker-inner.component';

// Flatpickr incorrectly handles CD, so OnPush cannot be applied to this component
// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: 'kv-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlModule, DatepickerInnerComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DatepickerComponent implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective: FormControlDirective;

  @Input()
  public formControl: FormControl;

  @Input()
  public formControlName: string;

  @Input()
  public label = '';

  @Input()
  public placeholderText = '';

  @Input()
  public isCentered: boolean;

  @Input()
  public isInline: boolean;

  @Input()
  public error: string;

  @Input()
  public minDate: Date;

  @Input()
  public maxDate: Date;

  @Input()
  public isLabelWithRequired: boolean;

  /* get hold of FormControl instance no matter formControl or formControlName is given. If formControlName is given, then this.controlContainer.control is the parent FormGroup (or FormArray) instance. */
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  get control() {
    return this.formControl || (this.controlContainer?.control.get(this.formControlName) as FormControl);
  }

  constructor(@Optional() private controlContainer: ControlContainer) {}

  public registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  public registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  public writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }
}
