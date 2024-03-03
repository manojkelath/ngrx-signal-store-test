import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, RouterNavigationAction } from '@ngrx/router-store';
import { tap } from 'rxjs/operators';

import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';

@Injectable()
export class AppGoogleAnalyticsEffects {
  public openEmployerRegistration$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        tap(({ payload }: RouterNavigationAction) => {
          this.appGoogleAnalyticsService.pageView(
            payload.event.urlAfterRedirects,
            payload.event.urlAfterRedirects.split('?')?.[0] || payload.event.urlAfterRedirects,
            window.location.href
          );
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private appGoogleAnalyticsService: AppGoogleAnalyticsService) {}
}
