import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { filter, mergeMap, of, withLatestFrom } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { getIfRegistrationStatusIsNotValid } from '@features/additional-information/state/selectors';
import { AuthActions } from '@features/auth/state/actions';
import { getCurrentUserOrganization } from '@features/auth/state/selectors';
import { EmployerRegistrationService } from '@features/employer-registration/services';
import {
  EmployerRegistrationFormAPIActions,
  EmployerRegistrationModalActions,
} from '@features/employer-registration/state/actions';
import {
  selectEmployerRegistrationData,
  selectEmployerRegistrationFormOpenState,
} from '@features/employer-registration/state/selectors';
import { mapEmployerRegistrationResponds } from '@features/employer-registration/utils';
import { SpinnerCoverService } from '@features/spinner';
import { IAppState } from '@shared/models';

@Injectable()
export class EmployerRegistrationEffects {
  public validateRegistrationStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployerRegistrationModalActions.openEmployerRegistrationModal, AuthActions.userIdentificationSuccess),
      withLatestFrom(
        this.store$.pipe(select(getCurrentUserOrganization)),
        this.store$.pipe(select(selectEmployerRegistrationFormOpenState))
      ),
      filter(([, , isEmployerRegistrationFormOpen]) => isEmployerRegistrationFormOpen),
      this.spinnerService.startInSequence(),
      exhaustMap(([, organization]) =>
        this.employerRegistrationService.validateRegistrationStatus(organization).pipe(
          map((data) => EmployerRegistrationFormAPIActions.validateRegistrationStatusSuccess({ data })),
          catchError((error) => of(EmployerRegistrationFormAPIActions.validateRegistrationStatusFailed({ error })))
        )
      ),
      this.spinnerService.endInSequence()
    )
  );

  public submitEmployerRegistrationModal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployerRegistrationModalActions.submitEmployerRegistrationModal),
      withLatestFrom(this.store$.pipe(select(getIfRegistrationStatusIsNotValid))),
      mergeMap(([{ data }, isInvalidRegistrationStatus]) => [
        isInvalidRegistrationStatus
          ? AuthActions.userIdentificationInitiated({ data: data.additionalInformation })
          : EmployerRegistrationFormAPIActions.employerRegistrationInitiated({ data }),
      ])
    )
  );

  public employerRegistrationInitiated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployerRegistrationFormAPIActions.employerRegistrationInitiated),
      withLatestFrom(this.store$.pipe(select(getCurrentUserOrganization))),
      exhaustMap(([{ data }, organization]) =>
        this.employerRegistrationService
          .registerEmployer({ ...data, organization })
          .pipe(map((resp) => mapEmployerRegistrationResponds(resp)))
      )
    )
  );

  public validateRegistrationStatusSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployerRegistrationFormAPIActions.validateRegistrationStatusSuccess),
      withLatestFrom(
        this.store$.pipe(select(selectEmployerRegistrationData)),
        this.store$.pipe(select(getIfRegistrationStatusIsNotValid))
      ),
      filter(([, employerRegistrationData]) => !!employerRegistrationData),
      mergeMap(([, employerRegistrationData]) => [
        EmployerRegistrationFormAPIActions.employerRegistrationInitiated({ data: employerRegistrationData }),
      ])
    )
  );

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private spinnerService: SpinnerCoverService,
    private employerRegistrationService: EmployerRegistrationService
  ) {}
}
