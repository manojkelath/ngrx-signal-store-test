import { Observable } from 'rxjs';

export abstract class FormControlFieldAbstract {
  public readonly isDisabled: boolean;

  public readonly isFullHeight: boolean;

  public readonly stateChanges: Observable<void>;
}
