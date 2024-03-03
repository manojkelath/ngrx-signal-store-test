import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { exhaustMap, filter, map, tap, withLatestFrom } from 'rxjs';

import { waitUntilAppConfigurationReady } from '@features/app-configuration/utils';
import { AuthUiWrapperContainerComponent } from '@features/auth/components';
import { LOGIN_POPUP_SUCCESS, USER_IDENTIFICATION_POPUP_SUCCESS } from '@features/auth/constants';
import { AuthAPIActionsEventsEnum, AuthPagesEnum } from '@features/auth/enums';
import { AUTH_API_ACTION_SOURCE, AuthActions, AuthPageActions, UserActions } from '@features/auth/state/actions';
import { getIsRegistrationWithValidationCode, getRegistrationModel } from '@features/auth/state/selectors';
import { mapRegistrationModelToAuthPage } from '@features/auth/utils';
import { selectEmployerRegistrationFormOpenState } from '@features/employer-registration/state/selectors';
import { ErrorHandlerService } from '@features/error-handler';
import { ModalOverlayService } from '@features/overlay';
import { SpinnerCoverService } from '@features/spinner';
import { AppRoutesEnum, RouteQueryParamsEnum } from '@shared/enums';
import { IAppState } from '@shared/models';
import { selectRouterUrl } from '@shared/state/selectors';
import { mapActionType } from '@shared/state/utils';
import { removeQueryParamsFromWindow } from '@shared/utils';

@Injectable()
export class AuthPageEffects {
  public authOverlayInitiated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.authOverlayPageChanged),
      filter(({ page }) => ![AuthPagesEnum.AH_SIGN_UP, AuthPagesEnum.KV_SIGN_UP].includes(page)), // separate logic. See the 'AuthPageActions.openSignUpPage' action.
      map(({ page }) => AuthPageActions.openAuthOverlay({ page }))
    )
  );

  public signUpOverlayInitiated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.openSignUpPage),
      waitUntilAppConfigurationReady(this.store$),
      this.spinnerService.startInSequence(),
      withLatestFrom(this.store$.pipe(select(getRegistrationModel))),
      map(([, registrationModel]) =>
        AuthPageActions.openAuthOverlay({
          page: mapRegistrationModelToAuthPage(registrationModel),
        })
      ),
      this.spinnerService.endInSequence()
    )
  );

  public openAuthOverlay$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthPageActions.openAuthOverlay),
        exhaustMap(() => this.overlayService.openModal(AuthUiWrapperContainerComponent))
      ),
    { dispatch: false }
  );

  public authOverlayClose$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthPageActions.authOverlayClosed),
        withLatestFrom(this.store$.pipe(select(selectRouterUrl))),
        tap(([, url]) => {
          const currentUrl = window.location.href;

          this.overlayService.closeModal(null);
          this.errorHandlerService.hide();
          if (
            currentUrl.includes(AppRoutesEnum.PRODUCT_PAYMENT) ||
            currentUrl.includes(AppRoutesEnum.ACCOUNT) ||
            !url
          ) {
            this.router.navigate([AppRoutesEnum.PRODUCT, AppRoutesEnum.PRODUCT_CATALOG]);
          }
        })
      ),
    { dispatch: false }
  );

  public authOverlaySimpleClose$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthPageActions.authOverlaySimpleClosed,
          AuthActions.userIdentificationSuccess,
          AuthActions.loginSuccess,
          AuthActions.changePasswordSuccess
        ),
        withLatestFrom(this.store$.pipe(select(selectEmployerRegistrationFormOpenState))),
        filter(([, isEmployerRegistrationFormOpen]) => !isEmployerRegistrationFormOpen),
        tap(([{ type }]) => {
          this.errorHandlerService.hide();
          let modalResult: null | string = null;
          if (type === mapActionType(AUTH_API_ACTION_SOURCE, AuthAPIActionsEventsEnum.LOGIN_SUCCESS)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            modalResult = LOGIN_POPUP_SUCCESS;
          }

          if (type === mapActionType(AUTH_API_ACTION_SOURCE, AuthAPIActionsEventsEnum.USER_IDENTIFICATION_SUCCESS)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            modalResult = USER_IDENTIFICATION_POPUP_SUCCESS;
          }

          this.overlayService.closeModal(modalResult);
        })
      ),
    { dispatch: false }
  );

  public changePasswordRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePasswordRequest),
      map(() =>
        AuthPageActions.authOverlayPageChanged({
          page: AuthPagesEnum.CHANGE_PASSWORD,
        })
      )
    )
  );

  public sendValidationCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendValidationCodeSuccess),
      map(() =>
        AuthPageActions.authOverlayPageChanged({
          page: AuthPagesEnum.VALIDATION_CODE,
        })
      )
    )
  );

  public signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupSuccess, AuthActions.ahSignupSuccess),
      withLatestFrom(this.store$.pipe(select(getIsRegistrationWithValidationCode))),
      map(([, isRegistrationWithValidationCode]) =>
        isRegistrationWithValidationCode
          ? AuthPageActions.authOverlayPageChanged({ page: AuthPagesEnum.LOGIN })
          : AuthPageActions.authOverlayPageChanged({
              page: AuthPagesEnum.SIGN_UP_CONFIRMATION,
            })
      )
    )
  );

  public logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigate([AppRoutesEnum.PRODUCT, AppRoutesEnum.PRODUCT_CATALOG]);
        })
      ),
    { dispatch: false }
  );

  public removeJWTTokenFromURL$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.apiUserChanged),
        filter(() => window.location.href.includes(RouteQueryParamsEnum.AH_JWT)),
        tap(() => {
          window.history.replaceState(
            {},
            null,
            removeQueryParamsFromWindow(window.location.href, RouteQueryParamsEnum.AH_JWT)
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private overlayService: ModalOverlayService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService,
    private spinnerService: SpinnerCoverService
  ) {}
}
