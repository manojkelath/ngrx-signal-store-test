import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DEFAULT_ERROR_MESSAGE } from '@features/error-handler/constants';
import { ErrorHandlerService } from '@features/error-handler/services';
import { ErrorHandlerActions } from '@features/error-handler/state/actions';

@Injectable()
export class ErrorHandlerEffects {
  public showGenericErrorMessage$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorHandlerActions.showGenericErrorMessage),
        tap(() => {
          this.errorHandlerService.newError(DEFAULT_ERROR_MESSAGE);
        })
      ),
    { dispatch: false }
  );

  public showErrorMessageError$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorHandlerActions.showUserError, ErrorHandlerActions.showApiError),
        tap(({ errorMessage }) => {
          this.errorHandlerService.newError(errorMessage);
        })
      ),
    { dispatch: false }
  );

  public showAuthErrorMessageError$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorHandlerActions.showAuthError),
        tap(({ errorMessage }) => {
          this.errorHandlerService.newAuthError(errorMessage);
        })
      ),
    { dispatch: false }
  );

  public showOverlayErrorMessageError$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorHandlerActions.showOverlayError),
        tap(({ errorMessage }) => {
          this.errorHandlerService.newOverlayError(errorMessage);
        })
      ),
    { dispatch: false }
  );

  public showChildErrorMessageError$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorHandlerActions.showChildError),
        tap(({ errorMessage }) => {
          this.errorHandlerService.newChildError(errorMessage);
        })
      ),
    { dispatch: false }
  );

  public clearErrors$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorHandlerActions.clearErrors),
        tap(() => {
          this.errorHandlerService.hide();
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private errorHandlerService: ErrorHandlerService) {}
}
