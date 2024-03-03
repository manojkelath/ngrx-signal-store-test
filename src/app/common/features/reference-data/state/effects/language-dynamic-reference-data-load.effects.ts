import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, of, switchMap, take, withLatestFrom } from 'rxjs';

import { ReferenceDataService } from '@features/reference-data/services';
import { ReferenceDataLoadingActions } from '@features/reference-data/state/actions';
import { createLanguageDynamicReferenceDataRequiresLoadSelector } from '@features/reference-data/state/selectors';
import { getActiveLanguage } from '@features/translate/state/selectors';
import { IAppState } from '@shared/models';

@Injectable()
export class LanguageDynamicReferenceDataLoadEffects {
  public checkIfLoadIsRequired$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceDataLoadingActions.languageDynamicDataRequest),
      withLatestFrom(this.store$.pipe(select(getActiveLanguage))),
      switchMap(([{ dataKey, params }, lang]) =>
        this.store$.select(createLanguageDynamicReferenceDataRequiresLoadSelector(dataKey, params, lang)).pipe(
          take(1),
          filter((isRequired) => isRequired),
          map(() => ReferenceDataLoadingActions.languageDynamicDataStartLoad({ dataKey, params, lang }))
        )
      )
    )
  );

  public loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceDataLoadingActions.languageDynamicDataStartLoad),
      mergeMap(({ dataKey, params, lang }) =>
        this.referenceDataService.getReferenceData(dataKey, params).pipe(
          map((response) =>
            ReferenceDataLoadingActions.languageDynamicDataLoadSuccess({ dataKey, params, lang, response })
          ),
          catchError((error) =>
            of(ReferenceDataLoadingActions.languageDynamicDataLoadFail({ dataKey, params, lang, error }))
          )
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
