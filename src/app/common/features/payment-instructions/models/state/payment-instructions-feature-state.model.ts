import { PaymentInstructionsApiModel } from '@features/payment-instructions/models/api';
import { PaymentMethodEnum } from '@shared/enums';

export interface PaymentInstructionsFeatureStateModel {
  instructions: Record<PaymentMethodEnum, PaymentInstructionsApiModel[]> | null;
}
