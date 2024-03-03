import { Highlightable } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';

import { EMPTY_OPTION_VALUE } from '@shared/constants';

import { SelectComponent } from './select.component';
import { SelectSyncService } from './select-sync.service';

@Component({
  selector: 'kv-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent implements Highlightable {
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

  @HostBinding('class.active')
  public active = false;

  private select: SelectComponent;

  constructor(private dropdownService: SelectSyncService) {
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
