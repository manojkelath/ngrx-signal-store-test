import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { CLASS_NAME_CONNECTED_ELEMENTS } from '@features/custom-select/constants';

@Component({
  selector: 'kv-custom-select-dropdown',
  templateUrl: './custom-select-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectDropdownComponent implements OnDestroy {
  @Input()
  public reference: HTMLElement;

  @ViewChild(CdkPortal)
  public contentTemplate: CdkPortal;

  private untilDestroySubscriptions = new Subscription();
  protected overlayRef: OverlayRef;
  private isShowing = false;
  private timer;

  constructor(protected overlay: Overlay, private cd: ChangeDetectorRef) {}

  public get showing() {
    return this.isShowing;
  }

  public show() {
    if (this.overlayRef) {
      clearTimeout(this.timer);
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }

    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);

    this.syncWidth();
    this.isShowing = true;

    this.untilDestroySubscriptions.add(
      this.overlayRef.backdropClick().subscribe((event: PointerEvent) => {
        event.stopPropagation();

        this.hide();
      })
    );
  }

  public hide() {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.overlayRef = null;
    this.isShowing = false;
    this.cd.markForCheck();
  }

  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  public syncPositions() {
    if (!this.overlayRef) {
      return;
    }

    this.timer = setTimeout(() => {
      this.overlayRef?.updatePositionStrategy(this.positionStrategy);
    }, 0);
  }

  protected getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private get positionStrategy() {
    const connectedElements = this.reference.getElementsByClassName(CLASS_NAME_CONNECTED_ELEMENTS);

    return this.overlay
      .position()
      .flexibleConnectedTo(connectedElements?.length ? connectedElements[0] : this.reference)
      .withPush(false)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ]);
  }

  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }

    const refRect = this.reference.getElementsByClassName(CLASS_NAME_CONNECTED_ELEMENTS)[0].getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }

  public ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.untilDestroySubscriptions.unsubscribe();
  }
}
