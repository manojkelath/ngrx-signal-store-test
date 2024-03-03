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
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { EMPTY_OPTION_VALUE } from '@shared/constants';

import { HEIGHT_SELECT_OPTION } from './constants';
import { CustomSelectDropdownComponent } from './custom-select-dropdown.component';
import { CustomSelectInputDirective } from './custom-select-input.directive';
import { CustomSelectOptionComponent } from './custom-select-option.component';
import { ISelectOptionModel } from './custom-select-option.model';
import { CustomSelectSyncService } from './custom-select-sync.service';

@Component({
  selector: 'kv-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
    CustomSelectSyncService,
  ],
})
export class CustomSelectComponent implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input()
  public optionsList: ISelectOptionModel[];

  @Input()
  public isLabelWithRequired = false;

  @Input()
  public isInline = false;

  @Input()
  public isSmall = false;

  @Input()
  public required = false;

  @Input()
  public sizeItemsShowing = 10;

  @Input()
  public error = '';

  @Input()
  public label: string;

  @Input()
  public filter: boolean;

  @Input()
  public multiselect: boolean;

  @Input()
  public emptyOption: boolean;

  @Input()
  public readonly: boolean;

  @Input()
  public displayValueDespiteOptions = false;

  @Input()
  public placeholder: string;

  @ViewChild('input')
  public input: ElementRef;

  @ViewChild(CustomSelectInputDirective, { static: true })
  public selectInputDirective: CustomSelectInputDirective;

  @ViewChild(CustomSelectDropdownComponent)
  public dropdown: CustomSelectDropdownComponent;

  @ContentChildren(CustomSelectOptionComponent)
  public options: QueryList<CustomSelectOptionComponent>;

  public selected: any[] = [];
  public selectedOptions: CustomSelectOptionComponent[] = [];
  public displayMultiselectOptions: CustomSelectOptionComponent[] = [];

  public heightSelectOption = HEIGHT_SELECT_OPTION;
  private maxSelectedOptions = 5;
  private timer;

  private isNgAfterViewInit = false;
  public isNoFilterData = false;
  public disabled = false;
  public isFocused = false;

  public filterValue = '';
  public displayText = '';
  public defaultPlaceholder = '';

  private keyManager: ActiveDescendantKeyManager<CustomSelectOptionComponent>;

  constructor(private dropdownService: CustomSelectSyncService, private cd: ChangeDetectorRef) {
    this.dropdownService.register(this);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.['optionsList'] && this.isNgAfterViewInit) {
      this.initValues();
    }
  }

  public get isShowDropdown() {
    return this.dropdown?.showing;
  }

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  public ngAfterViewInit() {
    setTimeout(() => {
      this.initValues();
      this.isNgAfterViewInit = true;
    });
  }

  public showDropdown() {
    if (this.readonly || !this.options.length) {
      return;
    }

    this.dropdown.show();
    this.filterValue = '';
    this.isNoFilterData = false;
    this.keyManager.setActiveItem(this.selected?.length ? this.selectedOptions[0] : null);
  }

  public hideDropdown() {
    this.filterValue = '';
    this.dropdown.hide();
    this.cd.detectChanges();
  }

  public onDropMenuIconClick(event: UIEvent) {
    event.stopPropagation();

    this.cleanTimer();
    this.timer = setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  public onKeyUp(event: KeyboardEvent) {
    this.filterValue = event.target['value'];

    this.isNoFilterData = this.options
      .toArray()
      .every((item) => item.value.toLowerCase().indexOf(this.filterValue.toLowerCase()) === -1);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) > -1) {
      if (!this.isShowDropdown) {
        this.showDropdown();
        event.preventDefault();
        return;
      }

      if (!this.options.length) {
        event.preventDefault();
        return;
      }
    }

    if (event.key === 'Enter') {
      const selectedOption = this.keyManager.activeItem;
      this.selectOption(selectedOption);
      event.preventDefault();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      if (this.isShowDropdown) {
        this.hideDropdown();
      }
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      event.preventDefault();
    } else if (
      ['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left'].indexOf(event.key) > -1
    ) {
      this.keyManager.onKeydown(event);
    }
  }

  public onUnselectOption(event, option) {
    event.stopPropagation();
    event.preventDefault();

    this.selectOption(option);
  }

  public selectOption(option: CustomSelectOptionComponent) {
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
      this.filterValue = '';
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

    if (this.displayValueDespiteOptions) {
      this.displayText = this.getDisplayText(this.selectedOptions);
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

  public trackByChips(_, item: CustomSelectOptionComponent) {
    return item.key;
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

  private getDisplayText(selectedOptions: CustomSelectOptionComponent[]): string {
    if (!this.multiselect && !!selectedOptions.length && selectedOptions[0].value !== EMPTY_OPTION_VALUE) {
      return selectedOptions[0].value;
    }

    if (!this.multiselect && this.selected[0] && this.displayValueDespiteOptions) {
      return this.selected[0];
    }

    return '';
  }

  private getDisplayMultiselectOptions(selectedOptions: CustomSelectOptionComponent[]): CustomSelectOptionComponent[] {
    this.dropdown.syncPositions();

    return this.multiselect && !!selectedOptions.length ? [...this.selectedOptions] : [];
  }

  private getSelectedKey(selectedOption: CustomSelectOptionComponent): string {
    return selectedOption.key ?? null;
  }

  private cleanTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public ngOnDestroy() {
    this.cleanTimer();
  }
}
