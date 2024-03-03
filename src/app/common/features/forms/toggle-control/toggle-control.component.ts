import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { ToggleComponent } from '@features/toggle';

@Component({
  standalone: true,
  selector: 'kv-toggle-control[googleAnalyticsCategory][label]',
  templateUrl: './toggle-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleControlComponent),
      multi: true,
    },
  ],
  imports: [ToggleComponent],
})
export class ToggleControlComponent implements ControlValueAccessor, OnChanges {
  @Input()
  public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input()
  public label: string;

  @Input()
  public isDisabled = false;

  @Input()
  public valueChanged: any;

  @Input()
  public handleOnClick: boolean;

  @Output()
  public handleClick = new EventEmitter<void>();

  public selectedValue: boolean;

  constructor(private cdRef: ChangeDetectorRef) {}

  public onChange = (_) => {};
  public onBlur = (_) => {};

  public ngOnChanges(changes: SimpleChanges) {
    //needed to update fields with dependencies
    if (changes?.['valueChanged']) {
      this.cdRef.markForCheck();
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.selectedValue = obj;
  }

  public onChanged(isChecked: boolean) {
    if (!this.isDisabled) {
      this.selectedValue = isChecked;
      this.onChange(this.selectedValue);
    }
  }

  public onClick(event) {
    if (this.handleOnClick) {
      event.stopPropagation();
      event.preventDefault();
      this.handleClick.emit();
    }
  }
}
