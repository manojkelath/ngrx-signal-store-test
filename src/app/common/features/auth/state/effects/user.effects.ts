import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable, switchMap, withLatestFrom } from 'rxjs';

import { AuthPagesEnum, UserInfoRealmEnum } from '@features/auth/enums';
import { UserService } from '@features/auth/services';
import { AuthActions, AuthPageActions, UserActions } from '@features/auth/state/actions';
import { getIsUserVerified } from '@features/auth/state/selectors';
import { ErrorHandlerActions } from '@features/error-handler';
import { IAppState } from '@shared/models';
import { InitActions } from '@shared/state/actions';

@Injectable()
export class UserEffects {
  public refineUserData$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(InitActions.pageInitialized, AuthActions.loginSuccess, AuthActions.changePasswordSuccess),
      switchMap(() =>
        this.userService.getUserInfo().pipe(
          switchMap((userInfo) => {
            if (userInfo?.realm && userInfo.realm !== UserInfoRealmEnum.PORTAL) {
              return [
                ErrorHandlerActions.showUserError({
                  errorMessage: 'not-a-customer-account',
                }),
                AuthActions.logoutInitiated(),
              ];
            }

            return [UserActions.apiUserChanged({ userInfo })];
          })
        )
      )
    )
  );

  public refineUserDataOnLogout$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      switchMap(() => this.userService.getUserInfo()),
      map((userInfo) => UserActions.apiUserChanged({ userInfo }))
    )
  );

  public invalidTokenDefected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.invalidTokenDetected),
      switchMap(() => [
        AuthPageActions.authOverlayPageChanged({ page: AuthPagesEnum.LOGIN }),
        ErrorHandlerActions.showAuthError({ errorMessage: 'session-has-expired' }),
      ])
    )
  );

  public userSuccessfullyRegistered$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.apiUserChanged),
      withLatestFrom(this.store$.pipe(select(getIsUserVerified))),
      filter(([, isUserVerified]) => isUserVerified),
      map(() => UserActions.userSuccessfullyRegistered())
    )
  );

  constructor(private actions$: Actions, private store$: Store<IAppState>, private userService: UserService) {}
}
