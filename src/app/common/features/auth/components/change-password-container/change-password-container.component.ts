import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { IChangePasswordModel } from '@features/auth/models';
import { AuthActions, AuthPageActions } from '@features/auth/state/actions';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-change-password-container',
  templateUrl: './change-password-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordContainerComponent {
  constructor(private store$: Store<IAppState>) {}

  public onCancel(): void {
    this.store$.dispatch(AuthPageActions.authOverlayClosed());
  }

  public onChangePassword(changePassword: IChangePasswordModel): void {
    this.store$.dispatch(AuthActions.changePasswordInitiated({ changePassword }));
  }
}
