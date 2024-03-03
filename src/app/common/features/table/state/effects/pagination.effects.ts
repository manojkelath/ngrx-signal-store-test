import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PaginationActions } from '@features/table/state/actions';

@Injectable()
export class PaginationEffects {
  public sizePerPageChanged$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PaginationActions.sizeChanged),
        switchMap(({ size }) =>
          from(
            this.router.navigate([], {
              queryParams: { size, page: 1 },
              queryParamsHandling: 'merge',
            })
          )
        )
      ),
    { dispatch: false }
  );

  public pageChanged$: Observable<any> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PaginationActions.pageChanged),
        switchMap(({ page }) =>
          from(
            this.router.navigate([], {
              queryParams: { page },
              queryParamsHandling: 'merge',
            })
          )
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
