import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorHandlerService } from '@features/error-handler/services';

@Component({
  selector: 'kv-auth-error-handler-container',
  templateUrl: './auth-error-handler-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthErrorHandlerContainerComponent {
  public error$: Observable<string | null> = this.errorHandlerService.authErrorMessage$;

  constructor(private errorHandlerService: ErrorHandlerService) {}

  public onHide() {
    this.errorHandlerService.hide();
  }
}
