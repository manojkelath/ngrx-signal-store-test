import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { EmployerRegistrationPayloadModel } from '@features/employer-registration/models/api';

export const EmployerRegistrationModalActions = createActionGroup({
  source: 'Employer Registration Modal',
  events: {
    'Open employer registration modal': emptyProps(),
    'Close employer registration modal': emptyProps(),

    'Submit employer registration modal': props<{ data: EmployerRegistrationPayloadModel }>(),
    'Show message': props<{ message: string }>(),
  },
});
