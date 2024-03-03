import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IForgotPasswordModel } from '@features/auth/models';
import { AuthActions, AuthPageActions } from '@features/auth/state/actions';
import { getIsSuccessfullyPasswordReset } from '@features/auth/state/selectors';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-forgot-password-container',
  templateUrl: './forgot-password-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordContainerComponent {
  public isSuccessfullyPasswordReset$: Observable<boolean> = this.store$.pipe(select(getIsSuccessfullyPasswordReset));

  constructor(private store$: Store<IAppState>) {}

  public onCancel(): void {
    this.store$.dispatch(AuthPageActions.authOverlayClosed());
  }

  public onForgotPassword(forgotPassword: IForgotPasswordModel) {
    this.store$.dispatch(AuthActions.forgotPasswordInitiated({ forgotPassword }));
  }
}
