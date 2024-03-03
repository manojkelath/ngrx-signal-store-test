import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { MAX_LENGTH } from '@shared/constants';

@Directive({ selector: '[kvSetMaxLength]' })
export class SetMaxLengthDirective implements OnInit {
  @Input()
  public kvSetMaxLength: string;

  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  public ngOnInit() {
    const maxLength = MAX_LENGTH[this.kvSetMaxLength || 'text'];

    if (maxLength) {
      this.el.maxLength = maxLength;
    }
  }
}
