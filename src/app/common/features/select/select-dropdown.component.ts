import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, HostListener, Input, ViewChild } from '@angular/core';

import { CLASS_NAME_CONNECTED_ELEMENTS } from '@features/select/constants';

@Component({
  selector: 'kv-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDropdownComponent {
  @Input()
  public reference: HTMLElement;

  @ViewChild(CdkPortal)
  public contentTemplate: CdkPortal;

  protected overlayRef: OverlayRef;

  public showing = false;

  constructor(protected overlay: Overlay) {}

  public show() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }

    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe((event: PointerEvent) => {
      // for preventing closing overlay when select is inside overlay
      event.stopPropagation();
      this.hide();
    });
    this.showing = true;
  }

  public hide() {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.overlayRef = null;

    this.showing = false;
  }

  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  protected getOverlayConfig(): OverlayConfig {
    const connectedElements = this.reference.getElementsByClassName(CLASS_NAME_CONNECTED_ELEMENTS);

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(connectedElements?.length ? connectedElements[0] : this.reference)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.close();

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }

    const refRect = this.reference.getElementsByClassName(CLASS_NAME_CONNECTED_ELEMENTS)[0].getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }
}
