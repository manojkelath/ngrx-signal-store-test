import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, fromEvent, merge, Observable, Observer, Subject, Subscription, takeUntil } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[kvIntersectionObserver]',
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  @Input() public kvIntersectionObserver: {
    root?: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
    debounceTime?: number;
  };

  private defaultConfigs = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
    debounceTime: 200,
  };

  private destroyed$ = new Subject<void>();
  private intersectionObserver: IntersectionObserver | null = null;
  private subscription: Subscription;

  @Output() public isIntersecting = new EventEmitter<boolean>();

  constructor(private element: ElementRef) {}

  public ngOnInit() {
    this.createAndObserve();
    this.watchWindowSizeChange();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private createAndObserve() {
    if (this.subscription?.closed === false) {
      this.subscription.unsubscribe();
    }

    const options: IntersectionObserverInit = {
      root: this.kvIntersectionObserver.root ?? this.defaultConfigs.root,
      rootMargin: this.kvIntersectionObserver.rootMargin ?? this.defaultConfigs.rootMargin,
      threshold: this.kvIntersectionObserver.threshold ?? this.defaultConfigs.threshold,
    };

    this.subscription = new Observable((observer: Observer<boolean>) => {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        observer.next(entries[0]?.isIntersecting);
      }, options);

      this.intersectionObserver.observe(this.element.nativeElement);

      return {
        unsubscribe() {
          this.intersectionObserver?.disconnect();
        },
      };
    })
      .pipe(debounceTime(this.kvIntersectionObserver.debounceTime ?? this.defaultConfigs.debounceTime))
      .subscribe((status) => {
        this.isIntersecting.emit(status);
      });
  }

  private watchWindowSizeChange(): void {
    merge(fromEvent(window, 'resize'), fromEvent(window, 'orientationchange'))
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(this.kvIntersectionObserver.debounceTime ?? this.defaultConfigs.debounceTime)
      )
      .subscribe(() => {
        this.createAndObserve();
      });
  }
}
