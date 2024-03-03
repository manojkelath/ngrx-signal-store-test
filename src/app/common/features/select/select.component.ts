import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { EMPTY_OPTION_VALUE } from '@shared/constants';

import { SelectDropdownComponent } from './select-dropdown.component';
import { SelectInputDirective } from './select-input.directive';
import { SelectOptionComponent } from './select-option.component';
import { ISelectOptionModel } from './select-option.model';
import { SelectSyncService } from './select-sync.service';

@Component({
  selector: 'kv-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    SelectSyncService,
  ],
})
export class SelectComponent implements AfterViewInit, OnChanges, ControlValueAccessor {
  @Input()
  public optionsList: ISelectOptionModel[];

  @Input()
  public label: string;

  @Input()
  public required = false;

  @Input()
  public error = '';

  @Input()
  public maxHeight: string;

  @Input()
  public filter: boolean;

  @Input()
  public multiselect: boolean;

  @Input()
  public emptyOption: boolean;

  @Input()
  public isLabelWithRequired = false;

  @Input()
  public isInline = false;

  @Input()
  public readonly: boolean;

  @ViewChild('input')
  public input: ElementRef;

  @ViewChild(SelectInputDirective, { static: true })
  public selectInputDirective: SelectInputDirective;

  @ViewChild(SelectDropdownComponent)
  public dropdown: SelectDropdownComponent;

  @ContentChildren(SelectOptionComponent)
  public options: QueryList<SelectOptionComponent>;

  public selected: any[]; // can be null, boolean, string
  public selectedOptions: SelectOptionComponent[] = [];

  public filterValue = '';

  public displayText = '';
  public displayMultiselectOptions: string[] = [];
  public disabled = false;
  public isFocused = false;
  private maxSelectedOptions = 5;

  private keyManager: ActiveDescendantKeyManager<SelectOptionComponent>;

  private isNgAfterViewInit = false;
  constructor(private dropdownService: SelectSyncService, private cd: ChangeDetectorRef) {
    this.dropdownService.register(this);
  }

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  public ngAfterViewInit() {
    setTimeout(() => {
      this.initValues();
      this.isNgAfterViewInit = true;
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.['optionsList'] && this.isNgAfterViewInit) {
      this.initValues();
    }
  }

  public showDropdown() {
    if (this.readonly || !this.options.length) {
      return;
    }

    this.dropdown.show();

    this.keyManager.setActiveItem(this.selected?.length ? this.selectedOptions[0] : null);
  }

  public hideDropdown() {
    this.dropdown.hide();
    this.filterValue = '';
  }

  public onDropMenuIconClick(event: UIEvent) {
    event.stopPropagation();
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  public onKeyUp(event: KeyboardEvent) {
    this.filterValue = event.target['value'];
  }

  public onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) > -1) {
      if (!this.dropdown.showing) {
        this.showDropdown();
        event.preventDefault();
        return;
      }

      if (!this.options.length) {
        event.preventDefault();
        return;
      }
    }

    if (event.key === 'Enter' || event.key === ' ') {
      const selectedOption = this.keyManager.activeItem;
      this.selectOption(selectedOption);
      event.preventDefault();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      if (this.dropdown.showing) {
        this.hideDropdown();
      }
    } else if (
      ['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left'].indexOf(event.key) > -1
    ) {
      this.keyManager.onKeydown(event);
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      if (this.dropdown.showing) {
        event.preventDefault();
      }
    }
  }

  public selectOption(option: SelectOptionComponent) {
    this.filterValue = '';

    const selectedOptionKey = this.getSelectedKey(option);

    if (this.multiselect) {
      if (this.checkSelectedCondition(selectedOptionKey)) {
        const selectedOptionIndex = this.selected.findIndex((item) => item === selectedOptionKey);
        const newSelected = [...this.selected];

        newSelected.splice(selectedOptionIndex, 1);

        this.selected = [...newSelected];

        const selectedOptionsComponentIndex = this.selectedOptions.findIndex((item) => item.key === selectedOptionKey);
        this.selectedOptions.splice(selectedOptionsComponentIndex, 1);

        this.keyManager.setActiveItem(null);
      } else {
        if (this.displayMultiselectOptions?.length < this.maxSelectedOptions) {
          this.selected = [...this.selected, selectedOptionKey];
          this.selectedOptions.push(option);
          this.keyManager.setActiveItem(option);
        }
      }
    } else {
      this.selected = [this.getSelectedKey(option)];
      this.selectedOptions = [option];
    }

    this.displayText = this.getDisplayText(this.selectedOptions);
    this.displayMultiselectOptions = this.getDisplayMultiselectOptions(this.selectedOptions);

    if (!this.multiselect) {
      this.hideDropdown();
      if (!this.filter) {
        this.input.nativeElement.focus();
      }
    }

    this.onChange();
    this.cd.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.selectInputDirective.isDisabled = isDisabled;
    this.selectInputDirective.stateChanges.next();
  }

  public writeValue(obj: any): void {
    if (obj === undefined || obj === null) {
      this.selected = [];
    } else {
      this.selected = this.multiselect ? obj : [obj];
    }
    if (this.options) {
      this.selectedOptions = this.options.toArray().filter((option) => this.checkSelectedCondition(option.key));
      this.displayText = this.getDisplayText(this.selectedOptions);
      this.displayMultiselectOptions = this.getDisplayMultiselectOptions(this.selectedOptions);

      this.cd.markForCheck();
    }
  }

  public onFocus() {
    this.isFocused = true;
  }

  public onTouched() {
    this.isFocused = false;

    this.onTouchedFn();
  }

  public onChange() {
    this.onChangeFn(this.selectedFormatter(this.selected));
  }

  public trackByChips(_, item: string) {
    return item;
  }

  public trackBySelectOption(_, option: ISelectOptionModel) {
    return option.key;
  }

  private initValues() {
    setTimeout(() => {
      this.selectedOptions = this.options.toArray().filter((option) => this.checkSelectedCondition(option.key));
      this.displayText = this.getDisplayText(this.selectedOptions);
      this.displayMultiselectOptions = this.getDisplayMultiselectOptions(this.selectedOptions);
      this.keyManager = new ActiveDescendantKeyManager(this.options)
        .withHorizontalOrientation('ltr')
        .withVerticalOrientation()
        .withWrap();
      this.cd.markForCheck();
    });
  }

  private selectedFormatter(selected: string[]) {
    return this.multiselect ? selected : selected[0];
  }

  private checkSelectedCondition(key: string): boolean {
    return this.selected?.includes(key);
  }

  private getDisplayText(selectedOptions: SelectOptionComponent[]): string {
    return !this.multiselect && !!selectedOptions.length && selectedOptions[0].value !== EMPTY_OPTION_VALUE
      ? selectedOptions[0].value
      : '';
  }

  private getDisplayMultiselectOptions(selectedOptions: SelectOptionComponent[]): string[] {
    return this.multiselect && !!selectedOptions.length ? this.selectedOptions.map((option) => option.value) : [];
  }

  private getSelectedKey(selectedOption: SelectOptionComponent): string {
    return selectedOption.key ?? null;
  }
}
