import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { LeadsApiService } from '@features/leads/services';
import { LeadRegisterFormActions, LeadRegisterFormAPIActions } from '@features/leads/state/actions';
import { SpinnerCoverService } from '@features/spinner';

@Injectable()
export class LeadRegisterEffects {
  public registerLead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadRegisterFormAPIActions.registerInitiated),
      this.spinnerService.startInSequence(),
      exhaustMap(({ data }) =>
        this.leadsApiService.register(data).pipe(
          map(() => LeadRegisterFormAPIActions.registerSuccess()),
          catchError((error) => of(LeadRegisterFormAPIActions.registerFailed({ error })))
        )
      ),
      this.spinnerService.endInSequence()
    )
  );

  public registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadRegisterFormAPIActions.registerSuccess),
      map(() => LeadRegisterFormActions.showSuccessMessage())
    )
  );

  constructor(
    private actions$: Actions,
    private spinnerService: SpinnerCoverService,
    private leadsApiService: LeadsApiService
  ) {}
}
