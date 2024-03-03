import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { LeadRegisterPayloadModel } from '@features/leads/models/api';
import { IApiErrorModel } from '@shared/models';

export const LeadRegisterFormAPIActions = createActionGroup({
  source: 'Product Catalog API',
  events: {
    'Register initiated': props<{ data: LeadRegisterPayloadModel }>(),
    'Register success': emptyProps(),
    'Register failed': props<{ error: IApiErrorModel }>(),
  },
});

export const LeadRegisterFormActions = createActionGroup({
  source: 'Product Catalog API',
  events: {
    'Open register form': emptyProps(),
    'close register form': emptyProps(),

    'Province initiated': emptyProps(),
    'City initiated': props<{ code: string }>(),

    'Show success message': emptyProps(),
  },
});
