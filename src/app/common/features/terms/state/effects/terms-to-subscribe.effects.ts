import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { UserActions } from '@features/auth/state/actions';
import { getCurrentUser, getCurrentUserTermsId } from '@features/auth/state/selectors';
import { ModalOverlayService } from '@features/overlay';
import { SpinnerCoverService } from '@features/spinner';
import { TermsToSubscribeContainerComponent } from '@features/terms/components';
import { TermsApiService, TermsToSubscribeService } from '@features/terms/services';
import { TermsToSubscribeApiActions, TermsToSubscribePageActions } from '@features/terms/state/actions';

@Injectable()
export class TermsToSubscribeEffects {
  public checkUserTerms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.apiUserChanged),
      filter(({ userInfo }) => !!userInfo.terms),
      map(() => TermsToSubscribePageActions.openOverlay())
    )
  );

  public openOverlay$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TermsToSubscribePageActions.openOverlay),
        exhaustMap(() => this.overlayService.openModal(TermsToSubscribeContainerComponent))
      ),
    { dispatch: false }
  );

  public overlayInitiated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TermsToSubscribePageActions.overlayInitiated),
      map(() => TermsToSubscribeApiActions.loadTerm())
    )
  );

  public loadTerms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TermsToSubscribeApiActions.loadTerm),
      this.spinnerService.startInSequence(),
      switchMap(() =>
        this.termsApiService.getTerms().pipe(
          map((terms) => TermsToSubscribeApiActions.loadTermSuccess({ terms })),
          catchError((error) => of(TermsToSubscribeApiActions.loadTermFailed({ error })))
        )
      ),
      this.spinnerService.endInSequence()
    )
  );

  public storeTerms$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TermsToSubscribeApiActions.loadTermSuccess),
        tap(({ terms }) => (this.termsToSubscribeService.terms$ = terms?.serviceTerms?.terms || ''))
      ),
    { dispatch: false }
  );

  public acceptTerms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TermsToSubscribeApiActions.acceptTerms),
      this.spinnerService.startInSequence(),
      withLatestFrom(this.store$.pipe(select(getCurrentUserTermsId))),
      switchMap(([{ terms }, termsId]) =>
        this.termsApiService.acceptTerms({ terms, termsId }).pipe(
          map(() => TermsToSubscribeApiActions.acceptTermsSuccess()),
          catchError((error) => of(TermsToSubscribeApiActions.acceptTermsFailed({ error })))
        )
      ),
      this.spinnerService.endInSequence()
    )
  );

  public acceptTermsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TermsToSubscribeApiActions.acceptTermsSuccess),
      withLatestFrom(this.store$.pipe(select(getCurrentUser))),
      tap(() => this.overlayService.closeModal(null)),
      map(([, user]) => UserActions.apiUserChanged({ userInfo: { ...user, terms: undefined } }))
    )
  );

  // KV-175
  // private genericError$ = createEffect(() =>
  //   this.actions$.pipe(ofType(TermsToSubscribeApiActions.acceptTermsFailed), mapErrorAction())
  // );

  constructor(
    private actions$: Actions,
    private overlayService: ModalOverlayService,
    private termsToSubscribeService: TermsToSubscribeService,
    private termsApiService: TermsApiService,
    private spinnerService: SpinnerCoverService,
    private store$: Store
  ) {}
}
