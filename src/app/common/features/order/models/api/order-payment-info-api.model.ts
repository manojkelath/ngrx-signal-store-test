export interface OrderPaymentInfoApiModel {
  paymentTerm: string;
  $paymentTerm: string;
  paymentTermCode: string;
  description: string;
  checkoutPaymentType: string;
  $checkoutPaymentType: string;
  paymentAmount: number;
  checkoutAmount: number;
  checkoutCredit: number;
  checkoutPercent: number;
  useDeposit: boolean;
  checkoutUse: string;
}
