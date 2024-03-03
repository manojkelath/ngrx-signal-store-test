import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AuthPagesEnum } from '@features/auth/enums';

@Component({
  selector: 'kv-auth-ui-wrapper',
  templateUrl: './auth-ui-wrapper.component.html',
  styleUrls: ['./auth-ui-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthUiWrapperComponent {
  @Input()
  public activePage: AuthPagesEnum;

  public authPages = AuthPagesEnum;
}
