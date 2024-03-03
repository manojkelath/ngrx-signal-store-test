import { createActionGroup, props } from '@ngrx/store';

import { AddressLocationResponseApiModel } from '@features/addresses/models/api';
import { IApiErrorModel } from '@shared/models';

export const AddressesActions = createActionGroup({
  source: 'Addresses API',
  events: {
    Retrieve: props<{ partyRoleId: string }>(),
    'Retrieve Success': props<{ items: AddressLocationResponseApiModel[] }>(),
    'Retrieve Failed': props<{ error: IApiErrorModel }>(),

    Delete: props<{ locationId: string }>(),
    'Delete Success': props<{ key: string }>(),
    'Delete Failed': props<{ error: IApiErrorModel }>(),
  },
});
