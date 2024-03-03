import { PaymentMethodEnum } from '@shared/enums';

import { PaymentInstructionsApiModel } from './payment-instructions-api.model';

export interface PaymentInstructionsResponseApiModel {
  paymentMethod: PaymentMethodEnum;
  paymentInstructions: PaymentInstructionsApiModel[];
}
