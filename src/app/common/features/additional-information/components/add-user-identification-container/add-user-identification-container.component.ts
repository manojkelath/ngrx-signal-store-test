import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  AdditionalInformationActions,
  UserIdentificationInitActions,
} from '@features/additional-information/state/actions';
import { IIdentificationInfoModel } from '@features/auth/models';
import { AuthPageActions } from '@features/auth/state/actions';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-add-user-identification-container',
  templateUrl: './add-user-identification-container.component.html',
  styleUrls: ['./add-user-identification-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserIdentificationContainerComponent implements OnInit {
  constructor(private store$: Store<IAppState>) {}

  public ngOnInit(): void {
    this.store$.dispatch(UserIdentificationInitActions.userIdentificationModalInit());
  }

  public onSubmitForm(data: IIdentificationInfoModel): void {
    this.store$.dispatch(AdditionalInformationActions.addUserIdentificationInitiated({ data }));
  }

  public onCancel(): void {
    this.store$.dispatch(AuthPageActions.authOverlaySimpleClosed());
  }
}
