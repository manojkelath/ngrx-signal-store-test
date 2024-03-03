import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, State } from '@ngrx/store';
import { catchError, exhaustMap, map, Observable, of, tap, withLatestFrom } from 'rxjs';

import { AddressLocationResponseApiModel } from '@features/addresses/models/api';
import { AddressesService } from '@features/addresses/services';
import { AddressesActions } from '@features/addresses/state/actions';
import { getCurrentUserOrganization } from '@features/auth/state/selectors';
import { SpinnerCoverService } from '@features/spinner';
import { IAppState } from '@shared/models/states';

@Injectable()
export class AddressesEffects {
  public load$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressesActions.retrieve),
      withLatestFrom(this.store$.pipe(select(getCurrentUserOrganization))),
      this.spinnerService.startInSequence(),
      exhaustMap(([, partyRoleId]: [Action, string]) =>
        this.addressesService.getAddresses(partyRoleId).pipe(
          map((locations: AddressLocationResponseApiModel[]) => AddressesActions.retrieveSuccess({ items: locations })),
          catchError((error) => of(AddressesActions.retrieveFailed({ error })))
        )
      )
    )
  );

  public delete$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressesActions.delete),
      withLatestFrom(this.store$.pipe(select(getCurrentUserOrganization))),
      this.spinnerService.startInSequence(),
      exhaustMap(([{ locationId }, partyRoleId]) =>
        this.addressesService.deleteAddress(locationId, partyRoleId).pipe(
          map(() => AddressesActions.deleteSuccess({ key: locationId })),
          catchError((error) => of(AddressesActions.deleteFailed({ error })))
        )
      ),
      this.spinnerService.endInSequence()
    )
  );

  public endSpinnerIfDataLoadFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddressesActions.retrieveFailed, AddressesActions.deleteSuccess, AddressesActions.deleteFailed),
        tap(() => this.spinnerService.end())
      ),
    { dispatch: false }
  );

  // KV-175
  // public genericError$ = createEffect(() =>
  //   this.actions$.pipe(ofType(AddressesActions.retrieveFailed, AddressesActions.deleteFailed), mapApiErrorAction())
  // );

  constructor(
    private actions$: Actions,
    private spinnerService: SpinnerCoverService,
    private addressesService: AddressesService,
    private store$: State<IAppState>
  ) {}
}
