import { Injectable } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerCoverService {
  public isLoading$: Observable<boolean>;
  public isNotLoading$: Observable<boolean>;
  public isLoadingDebounce$: Observable<boolean>;

  private isLoadingSubj$ = new BehaviorSubject(false);

  constructor() {
    this.isLoading$ = this.isLoadingSubj$.asObservable();
    this.isNotLoading$ = this.isLoading$.pipe(map((x) => !x));
    // debounceTime(75) to not cause spinner flickers for milliseconds under fast load
    this.isLoadingDebounce$ = this.isLoading$.pipe(debounceTime(75));
  }

  public startInSequence: <T>() => MonoTypeOperatorFunction<T> = () => tap(() => this.start());

  public endInSequence: <T>() => MonoTypeOperatorFunction<T> = () => tap(() => this.end());

  public start = () => this.isLoadingSubj$.next(true);

  public end = () => this.isLoadingSubj$.next(false);
}
