import { createActionGroup, props } from '@ngrx/store';

import { PaymentInstructionsResponseApiModel } from '@features/payment-instructions/models/api';
import { PaymentMethodEnum } from '@shared/enums';
import { IApiErrorModel } from '@shared/models';

export const PaymentInstructionsActions = createActionGroup({
  source: 'Payment instructions API',
  events: {
    Retrieve: props<{ paymentMethod: PaymentMethodEnum }>(),
    'Retrieve Success': props<{ response: PaymentInstructionsResponseApiModel; lang: string }>(),
    'Retrieve Failed': props<{ error: IApiErrorModel }>(),
  },
});
