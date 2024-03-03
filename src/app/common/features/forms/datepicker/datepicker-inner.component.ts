import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Ng2FlatpickrComponent, Ng2FlatpickrModule } from 'ng2-flatpickr';
import { Subject } from 'rxjs';

import { FormControlFieldAbstract, FormControlModule } from '@features/forms/form-control';
import { IconComponent } from '@shared/components/icon';
import { DOMService } from '@shared/services';

import { DATEPICKER_OPTIONS } from './datepicker.constants';

// Flatpickr incorrectly handles CD, so OnPush cannot be applied to this component
// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: 'kv-datepicker-inner',
  templateUrl: './datepicker-inner.component.html',
  styleUrls: ['./datepicker-inner.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerInnerComponent),
      multi: true,
    },
    { provide: FormControlFieldAbstract, useExisting: DatepickerInnerComponent },
  ],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlModule, Ng2FlatpickrModule, IconComponent],
  encapsulation: ViewEncapsulation.None,
})
export class DatepickerInnerComponent
  implements FormControlFieldAbstract, ControlValueAccessor, OnChanges, OnDestroy, AfterViewInit
{
  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective: FormControlDirective;

  @ViewChild(Ng2FlatpickrComponent, { static: true })
  public datepicker: Ng2FlatpickrComponent;

  @Input()
  public formControl: FormControl;

  @Input()
  public label = '';

  @Input()
  public placeholderText = '';

  @Input()
  public isCentered: boolean;

  @Input()
  public error: string;

  @Input()
  public minDate: Date;

  @Input()
  public maxDate: Date;

  public isDisabled = false;
  public isFullHeight = false;
  public empty = true;
  public focused = false;
  public stateChanges: Subject<void> = new Subject();

  public datepickerOptions = {
    ...DATEPICKER_OPTIONS,
    onChange: (_, value: string) => {
      this.datepicker.writeValue(value);
      this.empty = !value;
      this.stateChanges.next();
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    onClose: (_, __, ___) => {
      const elms = this.domService.getElements('.flatpickr-calendar-wrapper');
      elms.forEach((el) => this.domService.removeElement(el));
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    onOpen: (_, __, fp) => {
      // Wrapper for preventing page scrolling when datepicker is opened
      const calendarWrapper = this.domService.createElement('div');
      this.domService.addClass(calendarWrapper, 'flatpickr-calendar-wrapper');

      const calendarContainer = fp.calendarContainer;
      const parentDiv = calendarContainer.parentNode;

      parentDiv.insertBefore(calendarWrapper, calendarContainer);
    },
  };

  constructor(private domService: DOMService) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['minDate']) {
      if (this.datepicker.flatpickr && this.datepicker.flatpickr['set']) {
        this.datepicker.flatpickr['set']('minDate', this.minDate);
      }
      this.datepickerOptions = {
        ...this.datepickerOptions,
        minDate: this.minDate,
      };
    }

    if (changes['maxDate']) {
      if (this.datepicker.flatpickr && this.datepicker.flatpickr['set']) {
        this.datepicker.flatpickr['set']('maxDate', this.maxDate);
      }
      this.datepickerOptions = {
        ...this.datepickerOptions,
        maxDate: this.maxDate,
      };
    }
  }

  public ngAfterViewInit() {
    this.setDisableState();
    this.setFocusListener();
  }

  public ngOnDestroy() {
    if (this.datepicker.flatpickr && this.datepicker.flatpickr['destroy']) {
      this.datepicker.flatpickr['destroy']();
    }
    this.removeFocusListener();
  }

  public registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  public registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  public writeValue(obj: any): void {
    if (!obj) {
      this.resetInputValue();
      this.resetDatepicker();

      this.empty = true;
      this.stateChanges.next();
    } else {
      this.empty = false;
      this.stateChanges.next();
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.setDisableState();
    this.stateChanges.next();
    // flatpickr doesn't implement disabled state so doing a workaround for that case
    // this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }

  public onCalendarIconClick(event: Event): void {
    event.stopPropagation();

    // `flatpickr` is not typed inside library, so need to cast `any`
    (this.datepicker.flatpickr as any).toggle();
  }

  private setDisableState() {
    // eslint-disable-next-line no-underscore-dangle
    const input = (this.datepicker?.flatpickr as any)?._input;

    if (input) {
      input.disabled = this.isDisabled;
    }
  }

  private resetInputValue() {
    // eslint-disable-next-line no-underscore-dangle
    const input = (this.datepicker?.flatpickr as any)?._input;

    if (input) {
      input.value = null;
    }
  }

  private resetDatepicker() {
    if (this.datepicker.flatpickr && this.datepicker.flatpickr['clear']) {
      this.datepicker.flatpickr['clear']();
    }
  }

  private setFocusListener(): void {
    // eslint-disable-next-line no-underscore-dangle
    const input = (this.datepicker?.flatpickr as any)?._input;

    if (input) {
      input.addEventListener('focus', () => this.isFocusedInput(true));
      input.addEventListener('blur', () => this.isFocusedInput(false));
    }
  }

  private removeFocusListener(): void {
    // eslint-disable-next-line no-underscore-dangle
    const input = (this.datepicker?.flatpickr as any)?._input;

    if (input) {
      input.removeEventListener('focus', () => this.isFocusedInput(true));
      input.removeEventListener('blur', () => this.isFocusedInput(false));
    }
  }

  private isFocusedInput(focused: boolean): void {
    this.focused = focused;
    this.stateChanges.next();
  }
}
