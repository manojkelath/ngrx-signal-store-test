import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthPagesEnum } from '@features/auth/enums';
import { AhSignUpModel } from '@features/auth/models';
import { AuthActions, AuthPageActions } from '@features/auth/state/actions';
import { IAppState } from '@shared/models';

@Component({
  selector: 'kv-ah-sign-up-container',
  templateUrl: './ah-sign-up-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AhSignUpContainerComponent {
  constructor(private store$: Store<IAppState>) {}

  public onCloseModal() {
    this.store$.dispatch(AuthPageActions.authOverlayClosed());
  }

  public onLogin(): void {
    this.store$.dispatch(AuthPageActions.authOverlayPageChanged({ page: AuthPagesEnum.LOGIN }));
  }

  public onSignup(user: AhSignUpModel) {
    this.store$.dispatch(AuthActions.ahSignup({ user }));
  }
}
