import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, of, switchMap, take } from 'rxjs';

import { ReferenceDataService } from '@features/reference-data/services';
import { ReferenceDataLoadingActions } from '@features/reference-data/state/actions';
import { createDynamicReferenceDataRequiresLoadSelector } from '@features/reference-data/state/selectors';
import { IAppState } from '@shared/models';

@Injectable()
export class DynamicReferenceDataLoadEffects {
  public checkIfLoadIsRequired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceDataLoadingActions.dynamicDataRequest),
      switchMap(({ dataKey, params }) =>
        this.store$.select(createDynamicReferenceDataRequiresLoadSelector(dataKey, params)).pipe(
          take(1),
          filter((isRequired) => isRequired),
          map(() => ReferenceDataLoadingActions.dynamicDataStartLoad({ dataKey, params }))
        )
      )
    )
  );

  public loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceDataLoadingActions.dynamicDataStartLoad),
      mergeMap(({ dataKey, params }) =>
        this.referenceDataService.getReferenceData(dataKey, params).pipe(
          map((response) => ReferenceDataLoadingActions.dynamicDataLoadSuccess({ dataKey, params, response })),
          catchError((error) => of(ReferenceDataLoadingActions.dynamicDataLoadFail({ dataKey, params, error })))
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
