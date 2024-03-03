import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

import { DOMService } from '@shared/services';

@Directive({
  standalone: true,
  selector: '[kvClickOutside]',
})
export class ClickOutsideDirective {
  @Output() public clickedOutside: EventEmitter<void> = new EventEmitter<void>();

  constructor(private domService: DOMService) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onOutsideClick(event: Event, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    // isClickInsideDatepicker is for handling  3-d library with own overlay
    // cdk overlay and ng2-flatpickr overlay have separate top parent component
    // isClickInsideDatepicker handle case when we have datepicker inside overlay
    // without isClickInsideDatepicker project overlay will be closed when user navigates between months or years
    if (!this.isClickInsideComponentContent(event, targetElement) && !this.isClickInsideLoader(event)) {
      this.clickedOutside.emit();
    }
  }

  private isClickInsideComponentContent(event: Event, targetElement): boolean {
    return this.containsTarget(targetElement, event);
  }

  private isClickInsideLoader(event: Event) {
    const element = this.domService.getElement('.loading-spinner__overlay');

    return this.containsTarget(element, event);
  }

  private containsTarget(element: HTMLElement, event: Event): boolean {
    return element && element.contains(event.target as Node);
  }
}
