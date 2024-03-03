import { GetPaymentApprovalStatusApiModel } from '@features/payment/models';

export const mapPaymentApprovalResponseToPaymentStatusListener = (response): GetPaymentApprovalStatusApiModel => ({
  paymentType: response.paymentOption.paymentType,
  paymentToken: response.paymentOption?.paymentToken,
  returnUrl: response.paymentOption.returnUrl,
  locationId: response.locationId,
  salesTeam: response.salesTeam,
});

export const mapPaymentApprovalInProgressResponseToPaymentStatusListener = (
  response
): GetPaymentApprovalStatusApiModel => ({
  paymentType: response.paymentInProgress?.paymentMethod,
  paymentToken: response.paymentInProgress?.transactionId,
  returnUrl: response.paymentOption.returnUrl,
  locationId: response.locationId,
  salesTeam: response.salesTeam,
});
