import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, Observable, of, skip, withLatestFrom } from 'rxjs';

import { AuthActions } from '@features/auth/state/actions';
import { mapApiErrorAction } from '@features/error-handler/utils';
import { SpinnerCoverService } from '@features/spinner';
import { StatusNotificationsApiModel } from '@features/status-notifications/models/api';
import { StatusNotificationsService } from '@features/status-notifications/services';
import { StatusNotificationsActions } from '@features/status-notifications/state/actions';
import { getStatusNotifications } from '@features/status-notifications/state/selectors';
import { getActiveLanguage } from '@features/translate/state/selectors';
import { IAppState } from '@shared/models';

@Injectable()
export class StatusNotificationsEffects {
  public loadNotifications$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(StatusNotificationsActions.loadInitiated),
      this.spinnerService.startInSequence(),
      withLatestFrom(this.store$.pipe(select(getActiveLanguage))),
      exhaustMap(([, activeLang]: [any, string]) =>
        this.statusNotificationsService.getNotifications().pipe(
          map((notifications: StatusNotificationsApiModel) =>
            StatusNotificationsActions.loadSuccess({ notifications, lang: activeLang })
          ),
          catchError((error) => of(StatusNotificationsActions.loadFailed({ error })))
        )
      ),
      this.spinnerService.endInSequence()
    )
  );

  public handleClearNotificationsOnLogout$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      this.spinnerService.startInSequence(),
      map(() => StatusNotificationsActions.reset())
    )
  );

  public genericError$ = createEffect(() =>
    this.actions$.pipe(ofType(StatusNotificationsActions.loadFailed), mapApiErrorAction())
  );

  public languageReload$ = createEffect(() =>
    this.store$.pipe(
      select(getStatusNotifications),
      skip(1),
      filter((notifications) => !notifications),
      map(() => StatusNotificationsActions.loadInitiated())
    )
  );

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private spinnerService: SpinnerCoverService,
    private statusNotificationsService: StatusNotificationsService
  ) {}
}
