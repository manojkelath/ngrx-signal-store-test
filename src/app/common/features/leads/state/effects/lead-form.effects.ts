import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

import { LeadRegisterFormActions } from '@features/leads/state/actions';
import { selectLeadFormOpenState } from '@features/leads/state/selectors';
import { ReferenceDataLoadingActions } from '@features/reference-data';
import { ReferenceDataConstants } from '@features/reference-data/constants';
import { getCityPayload } from '@features/reference-data/utils';
import { IAppState } from '@shared/models';

@Injectable()
export class LeadFormEffects {
  public loadProvinces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadRegisterFormActions.provinceInitiated),
      map(() =>
        ReferenceDataLoadingActions.simpleDataRequest({
          dataKey: ReferenceDataConstants.indProvince,
        })
      )
    )
  );

  public loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadRegisterFormActions.cityInitiated),
      map(({ code }) =>
        ReferenceDataLoadingActions.dynamicDataRequest({
          dataKey: ReferenceDataConstants.indCity,
          params: getCityPayload(code),
        })
      )
    )
  );

  public closeFormOnNavigation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerNavigatedAction),
        withLatestFrom(this.store$.pipe(select(selectLeadFormOpenState))),
        filter(([, isFormOpened]) => isFormOpened),
        tap(() => this.store$.dispatch(LeadRegisterFormActions.closeRegisterForm()))
      ),
    {
      dispatch: false,
    }
  );

  constructor(private actions$: Actions, private store$: Store<IAppState>) {}
}
