import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  pairwise,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

import { COUNTRY_ID } from '@features/addresses/constants';
import { AddressCreateEditFromControlNameEnum } from '@features/addresses/enums';
import { AddressCreateEditFormViewModel } from '@features/addresses/models/view';
import { AddressReferencesActions } from '@features/addresses/state/actions';
import { createOptionKeyWithValue, getOptionKey, getOptionValue } from '@features/addresses/utils';
import { ISelectOptionModel } from '@features/custom-select';
import { ReferenceDataConstants } from '@features/reference-data/constants';
import {
  createDynamicReferenceDataListSelector,
  createDynamicReferenceDataLoadedSelector,
} from '@features/reference-data/state/selectors';
import {
  getCityPayload,
  getDistrictPayload,
  getPostalCodesPayload,
  getProvincePayload,
  getSubdistrictPayload,
} from '@features/reference-data/utils';

@Injectable()
export class AddressFormService implements OnDestroy {
  public get isPostalCodeInput$(): Observable<boolean> {
    return this.isPostalCodeInputState$.asObservable();
  }

  private destroyed$ = new Subject<void>();
  private isPostalCodeInputState$ = new BehaviorSubject<boolean>(true);

  constructor(private store$: Store<unknown>) {}

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getProvinceOptions$(): Observable<ISelectOptionModel[]> {
    return this.store$.pipe(
      select(createDynamicReferenceDataListSelector(ReferenceDataConstants.provinces, getProvincePayload(COUNTRY_ID))),
      map((options) =>
        options.map((item) => ({
          key: item.code,
          value: item.description,
        }))
      )
    );
  }

  public getCitiesOptions$(
    form$: Observable<FormGroup<AddressCreateEditFormViewModel>>
  ): Observable<ISelectOptionModel[]> {
    return form$?.pipe(
      takeUntil(this.destroyed$),
      filter((form) => !!form),
      switchMap((form) =>
        form.controls.province.valueChanges.pipe(
          startWith(form.controls.province.value),
          distinctUntilChanged(),
          switchMap((value) =>
            value ? this.getDynamicCodesListSelector(ReferenceDataConstants.citiesType, getCityPayload(value)) : of([])
          )
        )
      )
    );
  }

  public getDistrictsOptions$(
    form$: Observable<FormGroup<AddressCreateEditFormViewModel>>
  ): Observable<ISelectOptionModel[]> {
    return form$?.pipe(
      takeUntil(this.destroyed$),
      filter((form) => !!form),
      switchMap((form) =>
        form.controls.city.valueChanges.pipe(
          startWith(form.controls.city.value),
          distinctUntilChanged(),
          switchMap((value) =>
            value
              ? this.getDynamicCodesListSelector(
                  ReferenceDataConstants.districtsType,
                  getDistrictPayload(getOptionKey(value))
                )
              : of([])
          )
        )
      )
    );
  }

  public getSubdistrictsOptions$(
    form$: Observable<FormGroup<AddressCreateEditFormViewModel>>
  ): Observable<ISelectOptionModel[]> {
    return form$?.pipe(
      takeUntil(this.destroyed$),
      filter((form) => !!form),
      switchMap((form) =>
        form.controls.district.valueChanges.pipe(
          startWith(form.controls.district.value),
          distinctUntilChanged(),
          switchMap((value) =>
            value
              ? this.getDynamicCodesListSelector(
                  ReferenceDataConstants.subdistrictsType,
                  getSubdistrictPayload(getOptionKey(value))
                )
              : of([])
          )
        )
      )
    );
  }

  public getPostalCodeOptions$(
    form$: Observable<FormGroup<AddressCreateEditFormViewModel>>
  ): Observable<ISelectOptionModel[]> {
    return form$?.pipe(
      takeUntil(this.destroyed$),
      filter((form) => !!form),
      switchMap((form) =>
        form.controls.subdistrict.valueChanges.pipe(
          startWith(form.controls.subdistrict.value),
          distinctUntilChanged(),
          switchMap((value) => {
            if (!value) {
              return of([]);
            }

            return this.store$.pipe(
              select(
                createDynamicReferenceDataLoadedSelector(
                  ReferenceDataConstants.postalCodesType,
                  getPostalCodesPayload(getOptionValue(value))
                )
              ),
              filter(Boolean),
              take(1),
              switchMap(() =>
                this.getDynamicCodesListSelector(
                  ReferenceDataConstants.postalCodesType,
                  getPostalCodesPayload(getOptionValue(value))
                )
              )
            );
          }),
          tap((options) => this.isPostalCodeInputState$.next(!options?.length))
        )
      )
    );
  }

  private getDynamicCodesListSelector(action, payload): Observable<ISelectOptionModel[]> {
    return this.store$.pipe(
      select(createDynamicReferenceDataListSelector(action, payload)),
      map((options) =>
        options.map((item) => ({
          key: createOptionKeyWithValue(item.code, item.description),
          value: item.description,
        }))
      )
    );
  }

  public createFormValueChangeListener(form$: Observable<FormGroup<AddressCreateEditFormViewModel>>): void {
    form$
      .pipe(
        filter(Boolean),
        switchMap((form) =>
          form?.valueChanges.pipe(
            takeUntil(this.destroyed$),
            startWith(form.value),
            pairwise(),
            map(([prev, curr]) => {
              for (const currProp in curr) {
                if (prev[currProp] !== curr[currProp]) {
                  return [[currProp, curr[currProp]], form];
                }
              }
              return null;
            }),
            filter(Boolean)
          )
        )
      )
      .subscribe(([changedFormField, form]: [[AddressCreateEditFromControlNameEnum, string], FormGroup]) => {
        switch (changedFormField[0]) {
          case AddressCreateEditFromControlNameEnum.PROVINCE:
            form.patchValue(
              {
                [AddressCreateEditFromControlNameEnum.CITY]: '',
                [AddressCreateEditFromControlNameEnum.DISTRICT]: '',
                [AddressCreateEditFromControlNameEnum.SUBDISTRICT]: '',
                [AddressCreateEditFromControlNameEnum.POSTAL_CODE]: '',
              },
              { emitEvent: false }
            );

            this.store$.dispatch(AddressReferencesActions.loadCities({ provinceCode: changedFormField[1] }));

            break;
          case AddressCreateEditFromControlNameEnum.CITY:
            form.patchValue(
              {
                [AddressCreateEditFromControlNameEnum.DISTRICT]: '',
                [AddressCreateEditFromControlNameEnum.SUBDISTRICT]: '',
                [AddressCreateEditFromControlNameEnum.POSTAL_CODE]: '',
              },
              { emitEvent: false }
            );

            this.store$.dispatch(
              AddressReferencesActions.loadDistricts({ cityCode: getOptionKey(changedFormField[1]) })
            );

            break;
          case AddressCreateEditFromControlNameEnum.DISTRICT:
            form.patchValue(
              {
                [AddressCreateEditFromControlNameEnum.SUBDISTRICT]: '',
                [AddressCreateEditFromControlNameEnum.POSTAL_CODE]: '',
              },
              { emitEvent: false }
            );

            this.store$.dispatch(
              AddressReferencesActions.loadSubdistricts({ districtCode: getOptionKey(changedFormField[1]) })
            );

            break;
          case AddressCreateEditFromControlNameEnum.SUBDISTRICT:
            form.patchValue({ [AddressCreateEditFromControlNameEnum.POSTAL_CODE]: '' }, { emitEvent: false });

            this.store$.dispatch(
              AddressReferencesActions.loadPostalCodes({ subdistrictCode: getOptionValue(changedFormField[1]) })
            );

            break;
          default:
            break;
        }
      });
  }
}
