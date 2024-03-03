import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorHandlerService } from '@features/error-handler/services';

@Component({
  selector: 'kv-overlay-error-handler-container',
  templateUrl: './overlay-error-handler-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayErrorHandlerContainerComponent {
  public error$: Observable<string | null> = this.errorHandlerService.overlayErrorMessage$;

  constructor(private errorHandlerService: ErrorHandlerService) {}

  public onHide() {
    this.errorHandlerService.hide();
  }
}
