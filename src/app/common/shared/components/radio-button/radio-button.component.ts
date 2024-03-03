import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IconComponent } from '@shared/components/icon';

@Component({
  standalone: true,
  selector: 'kv-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, IconComponent],
})
export class RadioButtonComponent implements OnChanges, ControlValueAccessor {
  @Input()
  public radioValue: string;

  @Input()
  public currentValue: string;

  @Input()
  public disabled = false;

  public selectedValue: string;
  public isSelected = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.['currentValue']) {
      this.isSelected = this.currentValue === this.radioValue;
      this.cdRef.markForCheck();
    }
  }

  public onChange = (_) => {};
  public onBlur = (_) => {};

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: string): void {
    this.selectedValue = obj;
  }

  public onChanged(event) {
    this.selectedValue = event.target.value;
    this.onChange(this.selectedValue);
  }
}
