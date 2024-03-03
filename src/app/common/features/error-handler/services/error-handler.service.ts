import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  public errorMessage$: Observable<string>;
  public authErrorMessage$: Observable<string>;
  public overlayErrorMessage$: Observable<string>;
  public childErrorMessage$: Observable<string>;
  public warningMessage$: Observable<string>;

  private errorMessageSubj$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  private warningMessageSub$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  private authErrorMessageSubj$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  private overlayErrorMessageSubj$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  private childErrorMessageSubj$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  constructor() {
    this.errorMessage$ = this.errorMessageSubj$.asObservable();
    this.warningMessage$ = this.warningMessageSub$.asObservable();
    this.authErrorMessage$ = this.authErrorMessageSubj$.asObservable();
    this.overlayErrorMessage$ = this.overlayErrorMessageSubj$.asObservable();
    this.childErrorMessage$ = this.childErrorMessageSubj$.asObservable();
  }

  public newWarning(message: string): void {
    this.warningMessageSub$.next(message);
  }

  public newError(message: string): void {
    this.errorMessageSubj$.next(message);
  }

  public newAuthError(message: string): void {
    this.authErrorMessageSubj$.next(message);
  }

  public newOverlayError(message: string): void {
    this.overlayErrorMessageSubj$.next(message);
  }

  public newChildError(message: string): void {
    this.childErrorMessageSubj$.next(message);
  }

  public hide(): void {
    this.errorMessageSubj$.next(null);
    this.warningMessageSub$.next(null);
    this.authErrorMessageSubj$.next(null);
    this.overlayErrorMessageSubj$.next(null);
    this.childErrorMessageSubj$.next(null);
  }
}
