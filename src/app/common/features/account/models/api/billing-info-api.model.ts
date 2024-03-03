import { BillingAddressApiModel } from './billing-address-api.model';

export interface BillingInfoApiModel {
  accountId: string;
  accountIdType: string;
  $accountIdType: string;
  internalAccountId: string;
  invoiceSentTo: string;
  invoiceNo: string;
  invoiceDate: string;
  invoiceSentBy: string;
  invoiceSentDate: string;
  invoiceUrl: string;
  accountName: string;
  taxExempt: boolean;
  useBillAddrForTax: boolean;
  prepaid: boolean;
  invoiceMethod: string;
  billToAddress: BillingAddressApiModel;
  payment: {
    $paymentType: string;
    paymentType: string;
  };
  __metadata: any;
  lastBillingDate: string;
  lastDueDate: string;
  lastInvoiceUrl: string;
  nextBillingDate: string;
}
