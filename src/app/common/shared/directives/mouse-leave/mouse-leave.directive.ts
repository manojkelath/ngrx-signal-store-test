import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import Rany from 'ramda/es/any';

import { DOMService } from '@shared/services';

@Directive({
  standalone: true,
  selector: '[kvMouseLeave]',
})
export class MouseLeaveDirective {
  @Input() public kvMouseLeave: string[] = [];

  @Output() public mouseLeaveTriggered: EventEmitter<void> = new EventEmitter<void>();

  constructor(private domService: DOMService) {}

  @HostListener('mouseleave', ['$event', '$event.target'])
  public onMouseLeave(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) return;

    if (!this.isInsideContent(event)) this.mouseLeaveTriggered.emit();
  }

  private isInsideContent(event: MouseEvent) {
    const isTagIncluded = (tag) => {
      const element = this.domService.getElement(tag);
      return element ? element.isEqualNode(event.relatedTarget as Node) : false;
    };

    return this.kvMouseLeave ? Rany(isTagIncluded, this.kvMouseLeave) : false;
  }
}
