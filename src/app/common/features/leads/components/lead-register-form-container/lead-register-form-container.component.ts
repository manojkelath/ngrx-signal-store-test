import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';

import { LeadRegisterFormActions, LeadRegisterFormAPIActions } from '@features/leads/state/actions';
import { selectSuccessMessageState } from '@features/leads/state/selectors';
import {
  createDynamicReferenceDataListSelector,
  createStaticReferenceDataListSelector,
} from '@features/reference-data';
import { ReferenceDataConstants } from '@features/reference-data/constants';
import { getCityPayload } from '@features/reference-data/utils';
import { ISelectOptionModel } from '@features/select';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-lead-register-form-container',
  templateUrl: './lead-register-form-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadRegisterFormContainerComponent implements OnDestroy {
  public provinceOptions$: Observable<ISelectOptionModel[]>;
  public cityOptions$: Observable<ISelectOptionModel[]>;
  public isSuccessMessage$: Observable<boolean> = this.store$.pipe(select(selectSuccessMessageState));

  private province$ = new ReplaySubject<string>(1);

  private destroyed$ = new Subject<void>();

  constructor(private store$: Store<IAppState>) {
    this.store$.dispatch(LeadRegisterFormActions.provinceInitiated());

    this.provinceOptions$ = this.getProvinceOptions();
    this.cityOptions$ = this.getCityOptions();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public hideFormAction(): void {
    this.store$.dispatch(LeadRegisterFormActions.closeRegisterForm());
  }

  public submitForm(data): void {
    this.store$.dispatch(LeadRegisterFormAPIActions.registerInitiated({ data }));
  }

  public onProvinceChange(code: string): void {
    this.store$.dispatch(LeadRegisterFormActions.cityInitiated({ code }));
    this.province$.next(code);
  }

  private getProvinceOptions() {
    return this.store$.pipe(
      select(createStaticReferenceDataListSelector(ReferenceDataConstants.indProvince)),
      takeUntil(this.destroyed$),
      map((items) =>
        (items ?? []).map((item) => ({
          key: item.code,
          value: item.description,
        }))
      )
    );
  }

  private getCityOptions() {
    return this.province$.pipe(
      takeUntil(this.destroyed$),
      switchMap((province) =>
        this.store$.pipe(
          select(createDynamicReferenceDataListSelector(ReferenceDataConstants.indCity, getCityPayload(province))),
          map((options) =>
            options.map((item) => ({
              key: item.description,
              value: item.description,
            }))
          )
        )
      )
    );
  }
}
