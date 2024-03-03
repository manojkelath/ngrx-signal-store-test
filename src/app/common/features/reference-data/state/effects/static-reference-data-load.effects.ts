import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, of, switchMap, take } from 'rxjs';

import { ReferenceDataService } from '@features/reference-data/services';
import { ReferenceDataLoadingActions } from '@features/reference-data/state/actions';
import { createStaticReferenceDataRequiresLoadSelector } from '@features/reference-data/state/selectors';
import { IAppState } from '@shared/models';

@Injectable()
export class StaticReferenceDataLoadEffects {
  public checkIfLoadIsRequired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceDataLoadingActions.simpleDataRequest),
      switchMap(({ dataKey }) =>
        this.store$.select(createStaticReferenceDataRequiresLoadSelector(dataKey)).pipe(
          take(1),
          filter((isRequired) => isRequired),
          map(() => ReferenceDataLoadingActions.simpleDataStartLoad({ dataKey }))
        )
      )
    )
  );

  public loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceDataLoadingActions.simpleDataStartLoad),
      mergeMap(({ dataKey }) =>
        this.referenceDataService.getReferenceData(dataKey).pipe(
          map((response) => ReferenceDataLoadingActions.simpleDataLoadSuccess({ dataKey, response })),
          catchError((error) => of(ReferenceDataLoadingActions.simpleDataLoadFail({ dataKey, error })))
        )
      )
    )
  );

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private referenceDataService: ReferenceDataService
  ) {}
}
