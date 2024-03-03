import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { filter, Observable, switchMap } from 'rxjs';

import { AddressReferencesActions } from '@features/addresses/state/actions';
import { ReferenceDataConstants } from '@features/reference-data/constants';
import { ReferenceDataLoadingActions } from '@features/reference-data/state/actions';

@Injectable()
export class AddressReferencesEffects {
  public provincesLoad$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressReferencesActions.loadProvinces),
      switchMap(() => [
        ReferenceDataLoadingActions.dynamicDataRequest({
          dataKey: ReferenceDataConstants.provinces,
          params: { qualifier: 'ID' },
        }),
      ])
    )
  );

  public citiesLoad$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressReferencesActions.loadCities),
      filter(({ provinceCode }) => !!provinceCode),
      switchMap(({ provinceCode }) => [
        ReferenceDataLoadingActions.dynamicDataRequest({
          dataKey: ReferenceDataConstants.citiesType,
          params: { qualifier: provinceCode },
        }),
      ])
    )
  );

  public districtsLoad$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressReferencesActions.loadDistricts),
      filter(({ cityCode }) => !!cityCode),
      switchMap(({ cityCode }) => [
        ReferenceDataLoadingActions.dynamicDataRequest({
          dataKey: ReferenceDataConstants.districtsType,
          params: { qualifier: cityCode },
        }),
      ])
    )
  );

  public subdistrictLoad$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressReferencesActions.loadSubdistricts),
      filter(({ districtCode }) => !!districtCode),
      switchMap(({ districtCode }) => [
        ReferenceDataLoadingActions.dynamicDataRequest({
          dataKey: ReferenceDataConstants.subdistrictsType,
          params: { qualifier: districtCode },
        }),
      ])
    )
  );

  public postalCodeLoad$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressReferencesActions.loadPostalCodes),
      filter(({ subdistrictCode }) => !!subdistrictCode),
      switchMap(({ subdistrictCode }) => [
        ReferenceDataLoadingActions.dynamicDataRequest({
          dataKey: ReferenceDataConstants.postalCodesType,
          params: { qualifier: subdistrictCode },
        }),
      ])
    )
  );

  constructor(private actions$: Actions) {}
}
