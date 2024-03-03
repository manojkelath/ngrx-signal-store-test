import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthPagesEnum } from '@features/auth/enums';
import { ILoginInfoModel } from '@features/auth/models';
import { AuthActions, AuthPageActions } from '@features/auth/state/actions';
import { getIsSuccessfullyRegistered } from '@features/auth/state/selectors';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-login-container',
  templateUrl: './login-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  public isSuccessfullyRegistered$: Observable<boolean> = this.store$.pipe(select(getIsSuccessfullyRegistered));

  constructor(private store$: Store<IAppState>) {}

  public onCancel(): void {
    this.store$.dispatch(AuthPageActions.authOverlayClosed());
  }

  public onLogin(loginInfo: ILoginInfoModel): void {
    this.store$.dispatch(AuthActions.loginInitiated({ loginInfo }));
  }

  public onSignUp(): void {
    this.store$.dispatch(AuthPageActions.openSignUpPage());
  }

  public onForgotPassword() {
    this.store$.dispatch(AuthPageActions.authOverlayPageChanged({ page: AuthPagesEnum.FORGOT_PASSWORD }));
  }
}
