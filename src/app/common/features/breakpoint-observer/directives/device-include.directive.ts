import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DeviceBreakpointNameEnum } from '@features/breakpoint-observer/enums';
import { BreakpointObserverService } from '@features/breakpoint-observer/services';

@Directive({
  selector: '[kvDeviceInclude]',
  standalone: true,
})
export class DeviceIncludeDirective implements OnInit, OnDestroy {
  @Input()
  public kvDeviceInclude: DeviceBreakpointNameEnum[] = [];

  private isHidden = true;
  private destroyed$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private breakpointObserverService: BreakpointObserverService,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.breakpointObserverService
      .getCurrentDeviceBreakpointName$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((currentBreakpointName: DeviceBreakpointNameEnum) => {
        if (this.kvDeviceInclude.includes(currentBreakpointName)) {
          if (this.isHidden) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.isHidden = false;
          }
        } else {
          this.isHidden = true;
          this.viewContainer.clear();
        }
        this.cdRef.markForCheck();
      });
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
