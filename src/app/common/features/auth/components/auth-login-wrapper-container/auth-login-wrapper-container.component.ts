import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthPagesEnum } from '@features/auth/enums';

@Component({
  selector: 'kv-auth-login-wrapper-container',
  templateUrl: './auth-login-wrapper-container.component.html',
  styleUrls: ['./auth-login-wrapper-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginWrapperContainerComponent {
  public activePage = AuthPagesEnum.LOGIN;
}
