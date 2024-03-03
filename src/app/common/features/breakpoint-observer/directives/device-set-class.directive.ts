import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DeviceBreakpointNameEnum } from '@features/breakpoint-observer/enums';
import { BreakpointObserverService } from '@features/breakpoint-observer/services';
import { DOMService } from '@shared/services';

@Directive({
  selector: '[kvDeviceSetClass]',
  standalone: true,
})
export class DeviceSetClassDirective implements OnInit, OnDestroy {
  @Input()
  public kvDeviceSetClass: { device: DeviceBreakpointNameEnum; class: string }[] = [];

  private destroyed$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private breakpointObserverService: BreakpointObserverService,
    private domService: DOMService
  ) {}

  public ngOnInit(): void {
    this.breakpointObserverService
      .getCurrentDeviceBreakpointName$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((currentBreakpointName: DeviceBreakpointNameEnum) => {
        for (const model of this.kvDeviceSetClass) {
          if (model?.device === currentBreakpointName) {
            this.domService.addClass(this.elementRef.nativeElement, model?.class);
          } else {
            this.domService.removeClass(this.elementRef.nativeElement, model?.class);
          }
        }
      });
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
