import { Action } from '@ngrx/store';
import { map } from 'rxjs';

import { ErrorHandlerActions } from '@features/error-handler/state/actions';

import { mapApiErrorToString } from './api-error-mapper.utils';

export const mapChildErrorAction = () =>
  map<{ error: any }, Action>(({ error }) =>
    ErrorHandlerActions.showChildError({ errorMessage: mapApiErrorToString(error) })
  );
