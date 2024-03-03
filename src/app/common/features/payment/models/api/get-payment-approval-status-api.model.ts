import { PaymentMethodEnum } from '@shared/enums';

export interface GetPaymentApprovalStatusApiModel {
  paymentType: PaymentMethodEnum;
  paymentToken: string;
  returnUrl: string;
  locationId: string;
  salesTeam: string;
}
