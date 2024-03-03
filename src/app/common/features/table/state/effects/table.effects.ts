import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TableActions } from '@features/table/state/actions';

@Injectable()
export class TableEffects {
  public updateTableParams$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TableActions.sortChanged),
      switchMap(({ sortChanged }) =>
        from(
          this.router.navigate([], {
            queryParams: { ...sortChanged },
            queryParamsHandling: 'merge',
          })
        ).pipe(map(() => TableActions.paramsChanged()))
      )
    )
  );

  constructor(private actions$: Actions, private router: Router) {}
}
