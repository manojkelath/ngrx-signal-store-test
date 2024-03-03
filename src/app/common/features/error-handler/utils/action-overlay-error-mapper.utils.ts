import { Action } from '@ngrx/store';
import { map } from 'rxjs';

import { ErrorHandlerActions } from '@features/error-handler/state/actions';

import { mapApiErrorToString } from './api-error-mapper.utils';

export const mapOverlayErrorAction = () =>
  map<{ error: any }, Action>(({ error }) =>
    ErrorHandlerActions.showOverlayError({ errorMessage: mapApiErrorToString(error) })
  );
