import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorHandlerService } from '@features/error-handler/services';

@Component({
  selector: 'kv-child-error-handler-container',
  templateUrl: './child-error-handler-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildErrorHandlerContainerComponent {
  public error$: Observable<string | null> = this.errorHandlerService.childErrorMessage$;

  constructor(private errorHandlerService: ErrorHandlerService) {}

  public onHide() {
    this.errorHandlerService.hide();
  }
}
