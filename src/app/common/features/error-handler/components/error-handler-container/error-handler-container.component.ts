import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorHandlerService } from '@features/error-handler/services';

@Component({
  selector: 'kv-error-handler-container',
  templateUrl: './error-handler-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorHandlerContainerComponent {
  public error$: Observable<string | null> = this.errorHandlerService.errorMessage$;

  constructor(private errorHandlerService: ErrorHandlerService) {}

  public onHide() {
    this.errorHandlerService.hide();
  }
}
