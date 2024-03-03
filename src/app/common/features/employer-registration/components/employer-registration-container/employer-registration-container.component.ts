import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { getIfRegistrationStatusIsNotValid } from '@features/additional-information/state/selectors';
import { EmployerRegistrationModalActions } from '@features/employer-registration/state/actions';
import { selectEmployerRegistrationMessage } from '@features/employer-registration/state/selectors';
import { createStaticReferenceDataListSelector } from '@features/reference-data';
import { ReferenceDataConstants } from '@features/reference-data/constants';
import { ISelectOptionModel } from '@features/select';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-employer-registration-container',
  templateUrl: './employer-registration-container.component.html',
  styleUrls: ['./employer-registration-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployerRegistrationContainerComponent implements OnInit {
  public registrationStatusIsNotValid$: Observable<boolean> = this.store$.pipe(
    select(getIfRegistrationStatusIsNotValid)
  );
  public employerRegistrationMessage$: Observable<string> = this.store$.pipe(select(selectEmployerRegistrationMessage));
  public typeRegistrationOptions$: Observable<ISelectOptionModel[]>;

  constructor(private store$: Store<IAppState>) {}

  public ngOnInit() {
    this.typeRegistrationOptions$ = this.store$.pipe(
      select(createStaticReferenceDataListSelector(ReferenceDataConstants.eppTypeRegistration)),
      map((items) =>
        (items ?? []).map((item) => ({
          key: item.code,
          value: item.description,
        }))
      )
    );
  }

  public onClose() {
    this.store$.dispatch(EmployerRegistrationModalActions.closeEmployerRegistrationModal());
  }

  public onSubmit(data) {
    this.store$.dispatch(EmployerRegistrationModalActions.submitEmployerRegistrationModal({ data }));
  }
}
