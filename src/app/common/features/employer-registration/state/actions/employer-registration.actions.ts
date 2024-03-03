import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { EmployerRegistrationPayloadModel } from '@features/employer-registration/models/api';
import { IApiErrorModel } from '@shared/models';

export const EmployerRegistrationFormAPIActions = createActionGroup({
  source: 'Employer Registration API',
  events: {
    'Employer registration initiated': props<{ data: EmployerRegistrationPayloadModel }>(),

    'Validate registration status initiated': emptyProps(),
    'Validate registration status success': props<{ data: any }>(),
    'Validate registration status failed': props<{ error: IApiErrorModel }>(),
  },
});
