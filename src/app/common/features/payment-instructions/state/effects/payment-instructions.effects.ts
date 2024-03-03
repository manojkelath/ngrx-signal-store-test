import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { catchError, combineLatest, exhaustMap, filter, map, Observable, of, switchMap, take } from 'rxjs';

import { PaymentInstructionsResponseApiModel } from '@features/payment-instructions/models/api';
import { PaymentInstructionsApiService } from '@features/payment-instructions/services';
import { PaymentInstructionsActions } from '@features/payment-instructions/state/actions';
import { getPaymentInstructions } from '@features/payment-instructions/state/selectors';
import { getActiveLanguage } from '@features/translate/state/selectors';
import { IAppState } from '@shared/models';

@Injectable()
export class PaymentInstructionsEffects {
  public retrieve$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentInstructionsActions.retrieve),
      switchMap(({ paymentMethod }) =>
        combineLatest([
          this.store$.pipe(select(getPaymentInstructions(paymentMethod))).pipe(take(1)),
          this.store$.pipe(select(getActiveLanguage)).pipe(take(1)),
          of(paymentMethod),
        ])
      ),
      filter(([instructions]) => !instructions),
      exhaustMap(([, lang, paymentMethod]) =>
        this.paymentInstructionsApiService.get(paymentMethod).pipe(
          map((response: PaymentInstructionsResponseApiModel) =>
            PaymentInstructionsActions.retrieveSuccess({ response, lang })
          ),
          catchError((error) => of(PaymentInstructionsActions.retrieveFailed({ error })))
        )
      )
    )
  );

  // KV-175
  // public genericError$ = createEffect(() =>
  //   this.actions$.pipe(ofType(AddressesActions.retrieveFailed, AddressesActions.deleteFailed), mapApiErrorAction())
  // );

  constructor(
    private actions$: Actions,
    private store$: Store<IAppState>,
    private paymentInstructionsApiService: PaymentInstructionsApiService
  ) {}
}
