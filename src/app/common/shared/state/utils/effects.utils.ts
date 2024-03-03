import { Actions, EffectNotification, ofType } from '@ngrx/effects';
import { RouterNavigationAction, routerNavigationAction } from '@ngrx/router-store';
import { exhaustMap, filter, map, Observable, takeUntil } from 'rxjs';

import { IRouterStateUrlModel } from '@shared/models/states';

export const runEffectsOnRoute = (
  isPageFn: (routerState: IRouterStateUrlModel) => boolean,
  resolvedEffects$: Observable<EffectNotification>,
  actions$: Actions
) =>
  actions$.pipe(
    ofType(routerNavigationAction),
    map((action) => action as unknown as RouterNavigationAction<IRouterStateUrlModel>),
    filter(({ payload: { routerState } }) => isPageFn(routerState)),
    exhaustMap(() =>
      resolvedEffects$.pipe(
        takeUntil(
          actions$.pipe(
            ofType(routerNavigationAction),
            map((action) => action as unknown as RouterNavigationAction<IRouterStateUrlModel>),
            filter(({ payload: { routerState } }) => !isPageFn(routerState))
          )
        )
      )
    )
  );
