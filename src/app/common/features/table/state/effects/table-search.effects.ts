import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TableSearchActions } from '@features/table/state/actions';

@Injectable()
export class TableSearchEffects {
  public searchChanged$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TableSearchActions.changed),
        switchMap(({ search }) =>
          from(
            this.router.navigate([], {
              queryParams: { search, page: 1 },
              queryParamsHandling: 'merge',
            })
          )
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
