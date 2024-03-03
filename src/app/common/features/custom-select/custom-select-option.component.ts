import { Highlightable } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';

import { EMPTY_OPTION_VALUE } from '@shared/constants';

import { CustomSelectComponent } from './custom-select.component';
import { CustomSelectSyncService } from './custom-select-sync.service';

@Component({
  selector: 'kv-custom-select-option',
  templateUrl: './custom-select-option.component.html',
  styleUrls: ['./custom-select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectOptionComponent implements Highlightable {
  @Input()
  public key: string;

  @Input()
  public value: string;

  @HostBinding('class.selected')
  public get selected(): boolean {
    return (
      !!this.select.selectedOptions?.length &&
      this.select.selectedOptions[0].value !== EMPTY_OPTION_VALUE &&
      this.select.selectedOptions?.includes(this)
    );
  }

  @HostBinding('class.hidden')
  public get hidden(): boolean {
    return this.value?.toLowerCase()?.indexOf(this.select?.filterValue?.toLowerCase()) === -1;
  }

  @HostBinding('class.active')
  public active = false;

  private select: CustomSelectComponent;

  constructor(private dropdownService: CustomSelectSyncService) {
    this.select = this.dropdownService.getSelect();
  }

  public getLabel(): string {
    return this.value;
  }

  public setActiveStyles(): void {
    this.active = true;
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.select.selectOption(this);
  }
}
