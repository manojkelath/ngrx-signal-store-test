import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { IIdentificationInfoModel } from '@features/auth/models';

export const AdditionalInformationActions = createActionGroup({
  source: 'Additional information API',
  events: {
    'Add user identification overlay initiated': emptyProps(),
    'Province changed': props<{ code: string }>(),
    'Add user identification initiated': props<{ data: IIdentificationInfoModel }>(),
  },
});
