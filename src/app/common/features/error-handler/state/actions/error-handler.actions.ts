import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ErrorHandlerActions = createActionGroup({
  source: 'App Errors',
  events: {
    'Clear errors': emptyProps(),
    'Show generic error message': emptyProps(),
    'Show user error': props<{ errorMessage: string }>(),
    'Show auth error': props<{ errorMessage: string }>(),
    'Show overlay error': props<{ errorMessage: string }>(),
    'Show api error': props<{ errorMessage: string }>(),
    'Show child error': props<{ errorMessage: string }>(),
  },
});
