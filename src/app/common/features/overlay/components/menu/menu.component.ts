import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'kv-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnChanges, OnDestroy {
  @ContentChild('menuContainer') public menuTemplate: TemplateRef<any>;
  @ContentChild('menuConnector') public menuConnector: ElementRef;

  @Input()
  public connectedPositions: ConnectedPosition[] = [
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
  ];

  @Input()
  public isOpened = false;

  @Input()
  public hasBackdrop = true;

  @Output()
  public closed: EventEmitter<void> = new EventEmitter();

  private overlayRef: OverlayRef | null;

  constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef) {}

  @HostListener('document:click', ['$event'])
  public onOutsideClick(event: Event): void {
    if (this.isClickInsideComponent(event)) {
      return;
    }

    this.close();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpened']) {
      if (this.isOpened) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  public ngOnDestroy(): void {
    this.dispose();
  }

  private open(): void {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.menuConnector)
      .withPositions(this.connectedPositions);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      disposeOnNavigation: true,
      hasBackdrop: this.hasBackdrop,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this.overlayRef.attach(new TemplatePortal(this.menuTemplate, this.viewContainerRef));
  }

  private close(): void {
    this.closed.emit();
    this.dispose();
  }

  private isClickInsideComponent(event: Event): boolean {
    return this.buttonContainsTarget(event) || this.menuContainsTarget(event);
  }

  private buttonContainsTarget(event: Event): boolean {
    return !!this.menuConnector && this.containsTarget(this.menuConnector.nativeElement, event);
  }

  private menuContainsTarget(event: Event): boolean {
    return !!this.overlayRef && this.containsTarget(this.overlayRef.overlayElement, event);
  }

  private containsTarget(element: HTMLElement, event: Event): boolean {
    return element && element.contains(event.target as Node);
  }

  private dispose(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }
}
