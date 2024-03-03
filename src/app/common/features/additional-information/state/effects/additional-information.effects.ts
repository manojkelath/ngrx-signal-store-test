import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, filter, map, Observable, of, switchMap } from 'rxjs';

import { AddUserIdentificationContainerComponent } from '@features/additional-information/components';
import { UserIdentificationInitActions } from '@features/additional-information/state/actions';
import { AdditionalInformationActions } from '@features/additional-information/state/actions/additional-information.actions';
import { mapUserIdentificationFormToAPI } from '@features/additional-information/utils';
import { AuthActions } from '@features/auth/state/actions';
import { EmployerRegistrationModalActions } from '@features/employer-registration/state/actions';
import { ModalOverlayService, OVERLAY_CONFIG } from '@features/overlay';
import { ReferenceDataLoadingActions } from '@features/reference-data';
import { ReferenceDataConstants } from '@features/reference-data/constants';
import { getCityPayload } from '@features/reference-data/utils';

@Injectable()
export class AdditionalInformationEffects {
  public addUserIdentificationOverlay$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AdditionalInformationActions.addUserIdentificationOverlayInitiated),
      switchMap(() => this.overlayService.openModal(AddUserIdentificationContainerComponent, OVERLAY_CONFIG)),
      filter(Boolean),
      map((data) => AdditionalInformationActions.addUserIdentificationInitiated({ data }))
    )
  );

  public addUserIdentification$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AdditionalInformationActions.addUserIdentificationInitiated),
      map(({ data }) => AuthActions.userIdentificationInitiated({ data: mapUserIdentificationFormToAPI(data) }))
    )
  );

  public loadClientInfoProvinces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserIdentificationInitActions.userIdentificationModalInit,
        EmployerRegistrationModalActions.openEmployerRegistrationModal
      ),
      map(() =>
        ReferenceDataLoadingActions.simpleDataRequest({
          dataKey: ReferenceDataConstants.indProvince,
        })
      )
    )
  );

  public loadClientInfoCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdditionalInformationActions.provinceChanged),
      switchMap(({ code }) =>
        code
          ? of(
              ReferenceDataLoadingActions.dynamicDataRequest({
                dataKey: ReferenceDataConstants.indCity,
                params: getCityPayload(code),
              })
            )
          : EMPTY
      )
    )
  );

  constructor(private actions$: Actions, private overlayService: ModalOverlayService) {}
}
