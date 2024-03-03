import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { catchError, exhaustMap, map, Observable, of, tap, withLatestFrom } from 'rxjs';

import { environment } from '@environment';

import { AppConfigurationApiModel } from '@features/app-configuration/models/api';
import { AppConfigurationService } from '@features/app-configuration/services';
import { AppConfigurationApiActions } from '@features/app-configuration/state/actions';
import { getGoogleAnalyticsTrackId, getZealsConfigurations } from '@features/app-configuration/state/selectors';
import { mapApiErrorAction } from '@features/error-handler/utils';
import { SpinnerCoverService } from '@features/spinner';
import { IAppState } from '@shared/models';
import { DOMService } from '@shared/services';
import { InitActions } from '@shared/state/actions';

// eslint-disable-next-line @typescript-eslint/ban-types
declare const gtag: Function;

@Injectable()
export class AppConfigurationEffects {
  public loadConfiguration$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(InitActions.pageInitialized),
      this.spinnerService.startInSequence(),
      exhaustMap(() =>
        this.appConfigurationService.getConfiguration().pipe(
          map((configuration: AppConfigurationApiModel) => AppConfigurationApiActions.loadSuccess({ configuration })),
          catchError((error) => of(AppConfigurationApiActions.loadFailed({ error })))
        )
      )
    )
  );

  public loadExternalConfigurations$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppConfigurationApiActions.loadSuccess),
        withLatestFrom(
          this.store$.pipe(select(getZealsConfigurations)),
          this.store$.pipe(select(getGoogleAnalyticsTrackId))
        ),
        tap(([, zealsConfigurations, googleAnalyticsTrackId]) => {
          if (zealsConfigurations?.affiliateId) {
            this.domService.addScript(
              `${zealsConfigurations?.url}/platform/js/zealsamp.js?aff_id=${
                zealsConfigurations.affiliateId
              }&v=${new Date().getTime()}`
            );
          }

          if (environment.googleAnalyticsTrackingCode || googleAnalyticsTrackId) {
            this.domService.addScript(
              `https://www.googletagmanager.com/gtag/js?id=${
                environment.googleAnalyticsTrackingCode || googleAnalyticsTrackId
              }`
            );
            gtag('config', environment.googleAnalyticsTrackingCode || googleAnalyticsTrackId);
          }

          this.spinnerService.end();
        })
      ),
    { dispatch: false }
  );

  public genericSpinnerEnd$ = createEffect(() =>
    this.actions$.pipe(ofType(AppConfigurationApiActions.loadFailed), this.spinnerService.endInSequence())
  );

  public genericError$ = createEffect(() =>
    this.actions$.pipe(ofType(AppConfigurationApiActions.loadFailed), mapApiErrorAction())
  );

  constructor(
    private actions$: Actions,
    private spinnerService: SpinnerCoverService,
    private appConfigurationService: AppConfigurationService,
    private domService: DOMService,
    private store$: Store<IAppState>
  ) {}
}
