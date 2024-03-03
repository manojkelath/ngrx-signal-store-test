export interface OrderPaymentApiModel {
  paymentId: string;
  invoiceNo: string;
  accountId: string;
  customerId: string;
  customerNo: string;
  customerName: string;
  accountNo: string;
  orderNumber: string;
  firstDueDate: string;
  dueDate: string;
  currency: string;
  paymentType: string;
  $paymentType: string;
  paymentTerm: string;
  $paymentTerm: string;
  paymentAmt: number;
  amountDue: number;
  payAttempts: number;
  lastUpdated: string;
  partyRoleType: string;
  orderSource: string;
  $orderSource: string;
  paidDate: string;
}
