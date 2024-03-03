import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';

import { EmployerRegistrationContainerComponent } from '@features/employer-registration/components';
import { EmployerRegistrationModalActions } from '@features/employer-registration/state/actions';
import { ErrorHandlerService } from '@features/error-handler';
import { ModalOverlayService } from '@features/overlay';
import { ReferenceDataLoadingActions } from '@features/reference-data';
import { ReferenceDataConstants } from '@features/reference-data/constants';

@Injectable()
export class EmployerRegistrationModalEffects {
  public openEmployerRegistration$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployerRegistrationModalActions.openEmployerRegistrationModal),
        tap(() => {
          this.errorHandlerService.hide();
        }),
        exhaustMap(() => this.overlayService.openModal(EmployerRegistrationContainerComponent))
      ),
    { dispatch: false }
  );

  public loadEppTypeRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployerRegistrationModalActions.openEmployerRegistrationModal),
      map(() =>
        ReferenceDataLoadingActions.simpleDataRequest({
          dataKey: ReferenceDataConstants.eppTypeRegistration,
        })
      )
    )
  );

  public closeEmployerRegistrationModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployerRegistrationModalActions.closeEmployerRegistrationModal),
        tap(() => {
          this.overlayService.closeModal(null);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private overlayService: ModalOverlayService,
    private errorHandlerService: ErrorHandlerService
  ) {}
}
