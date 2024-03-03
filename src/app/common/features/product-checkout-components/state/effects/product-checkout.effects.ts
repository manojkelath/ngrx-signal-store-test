import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import { ProductCheckoutActions } from '@features/product-checkout-components/state/actions';
import { getProductCategoryById, getReferenceLocation } from '@features/product-checkout-components/utils';
import { ReferenceDataLoadingActions } from '@features/reference-data';
import { ReferenceDataConstants } from '@features/reference-data/constants';
import { getCityPayload } from '@features/reference-data/utils';

@Injectable()
export class ProductCheckoutPageEffects {
  public loadLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCheckoutActions.locationInitiated),
      map(({ productCategoryId }) =>
        ReferenceDataLoadingActions.simpleDataRequest({
          dataKey: getReferenceLocation(getProductCategoryById(productCategoryId)),
        })
      )
    )
  );

  public loadProvinces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCheckoutActions.provinceInitiated),
      map(() =>
        ReferenceDataLoadingActions.simpleDataRequest({
          dataKey: ReferenceDataConstants.indProvince,
        })
      )
    )
  );
  public loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCheckoutActions.cityInitiated),
      map(({ code }) =>
        ReferenceDataLoadingActions.dynamicDataRequest({
          dataKey: ReferenceDataConstants.indCity,
          params: getCityPayload(code),
        })
      )
    )
  );

  public loadTypeRegistrationOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCheckoutActions.registrationTypeInitiated),
      map(() =>
        ReferenceDataLoadingActions.simpleDataRequest({
          dataKey: ReferenceDataConstants.eppTypeRegistration,
        })
      )
    )
  );

  constructor(private actions$: Actions) {}
}
