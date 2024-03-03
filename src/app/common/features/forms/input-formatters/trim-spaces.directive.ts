import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[kvTrimSpaces]' })
export class TrimSpacesDirective {
  constructor(private control: NgControl) {}

  @HostListener('blur', ['$event.target.value'])
  public onBlur(value: string) {
    this.format(value);
  }

  private format(value) {
    if (typeof value === 'string') {
      this.control.control.setValue(value.trim());
    }
  }
}
