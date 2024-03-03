export interface BillingInfoViewModel {
  invoiceNo: string;
  invoiceDate: string;
  invoiceSentBy: string;
  invoiceSentDate: string;
  invoiceSentTo: string;
  invoiceUrl: string;
  accountName: string;
  accountId: string;
  accountIdType: string;
  taxExempt: boolean;
  useBillAddrForTax: boolean;
  prepaid: boolean;
  paymentType: string;
  paymentTypeTitle: string;
  invoiceMethod: string;
  lastBillingDate: string;
  lastDueDate: string;
  lastInvoiceUrl: string;
  nextBillingDate: string;
}
