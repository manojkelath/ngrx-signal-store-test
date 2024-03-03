import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { OVERLAY_CONFIG } from '@features/overlay/constants';

@Injectable({
  providedIn: 'root',
})
export class ModalOverlayService {
  private defaultOverlayConfig = {
    hasBackdrop: true,
    panelClass: ['generic-modal__panel'],
    backdropClass: 'generic-modal__backdrop',
    scrollStrategy: this.overlay.scrollStrategies.noop(),
  };

  public overlayRef: OverlayRef | null;
  private containerRef$: BehaviorSubject<{
    viewContainerRef: ViewContainerRef;
    injector: Injector;
  } | null> = new BehaviorSubject(null);
  private modalResult$: Subject<any> = new Subject();

  constructor(private overlay: Overlay) {}

  public registerCurrentContainerRef(viewContainerRef: ViewContainerRef, injector: Injector) {
    this.containerRef$.next({
      viewContainerRef,
      injector,
    });
  }

  public unregisterCurrentContainerRef() {
    this.containerRef$.next(null);
  }

  public openModal<T>(
    component: ComponentType<T>,
    data: any = null,
    overrideConfig: OverlayConfig = OVERLAY_CONFIG,
    dataProperty: string = 'data'
  ) {
    return this.containerRef$.pipe(
      take(1),
      switchMap((containerRef) => {
        this.closeModal(null);
        const configs = new OverlayConfig({
          ...this.defaultOverlayConfig,
          ...overrideConfig,
        });

        this.overlayRef = this.overlay.create(configs);
        const instance = this.overlayRef.attach(
          new ComponentPortal(component, containerRef?.viewContainerRef, containerRef?.injector)
        ).instance;

        if (dataProperty && data) {
          instance[dataProperty] = data;
        }

        return this.modalResult$.pipe(take(1));
      })
    );
  }

  public closeModal(modalResult: any) {
    this.modalResult$.next(modalResult);

    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
