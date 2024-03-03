import { AfterViewInit, Directive, ElementRef } from '@angular/core';

import { DOMService } from '@shared/services';

@Directive({
  selector: 'input[kvHiddenTextInput]',
})
export class HiddenTextInputDirective implements AfterViewInit {
  private shown = false;

  constructor(private elementRef: ElementRef, private domService: DOMService) {}

  public ngAfterViewInit() {
    this.setup();
  }

  private setup() {
    const iconWrapper = this.elementRef.nativeElement.nextElementSibling;
    this.domService.addClass(this.elementRef.nativeElement, 'kv-form__input--hidden-text');

    iconWrapper.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      this.toggle(this.elementRef.nativeElement, iconWrapper);
    });
  }

  private toggle(element: HTMLElement, iconWrapper: HTMLElement): void {
    this.shown = !this.shown;

    if (this.shown) {
      this.domService.removeClass(element, 'kv-form__input--hidden-text');
      element.setAttribute('type', 'text');
      this.domService.addClass(iconWrapper, 'is-shown');
    } else {
      this.domService.addClass(element, 'kv-form__input--hidden-text');
      element.setAttribute('type', 'password');
      this.domService.removeClass(iconWrapper, 'is-shown');
    }
  }
}
