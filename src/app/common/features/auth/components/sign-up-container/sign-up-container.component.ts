import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthPagesEnum } from '@features/auth/enums';
import { ISignUpInfoModel } from '@features/auth/models';
import { AuthActions, AuthPageActions } from '@features/auth/state/actions';
import { getSignupInfo } from '@features/auth/state/selectors';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-sign-up-container',
  templateUrl: './sign-up-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpContainerComponent {
  public signupInfo$: Observable<ISignUpInfoModel> = this.store$.pipe(select(getSignupInfo));

  constructor(private store$: Store<IAppState>) {}

  public onSignUp(signupInfo: ISignUpInfoModel): void {
    this.store$.dispatch(AuthActions.signupSubmittedDataInitiated({ signupInfo }));
  }

  public onLogin(): void {
    this.store$.dispatch(AuthPageActions.authOverlayPageChanged({ page: AuthPagesEnum.LOGIN }));
  }

  public onCancel(): void {
    this.store$.dispatch(AuthPageActions.authOverlayClosed());
  }
}
