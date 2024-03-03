import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { AppNavActions } from '@features/app-nav/state/actions';
import { UserService } from '@features/auth/services';
import { RouteQueryParamsEnum } from '@shared/enums';

@Injectable()
export class AppNavEffects {
  public externalLinkNavigated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppNavActions.externalLinkNavigated),
        exhaustMap(({ externalLink }) =>
          this.userService.generateJWTToken().pipe(
            map((token: string) => ({ token, externalLink })),
            catchError(() => of({ externalLink, token: null }))
          )
        ),
        tap(({ externalLink, token }) => {
          window.location.href = token ? `${externalLink}?${RouteQueryParamsEnum.JWT}=${token}` : externalLink;
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
