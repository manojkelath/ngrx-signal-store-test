import { environment } from '@environment';

import { BillingInfoApiModel } from '@features/account/models/api';
import { BillingInfoViewModel } from '@features/account/models/view';

export const billingInfoViewMapperUtil = (billingInfo: BillingInfoApiModel): BillingInfoViewModel => ({
  invoiceNo: billingInfo.invoiceNo,
  invoiceDate: billingInfo.invoiceDate,
  invoiceSentBy: billingInfo.invoiceSentBy,
  invoiceSentDate: billingInfo.invoiceSentDate,
  invoiceSentTo: billingInfo.invoiceSentTo,
  invoiceUrl: environment.hostAssets + billingInfo.invoiceUrl,
  lastBillingDate: billingInfo.lastBillingDate,
  lastDueDate: billingInfo.lastDueDate,
  lastInvoiceUrl: environment.hostAssets + billingInfo.lastInvoiceUrl,
  nextBillingDate: billingInfo.nextBillingDate,
  accountName: billingInfo.accountName,
  accountId: billingInfo.accountId,
  accountIdType: billingInfo.$accountIdType,
  taxExempt: billingInfo.taxExempt,
  useBillAddrForTax: billingInfo.useBillAddrForTax,
  prepaid: billingInfo.prepaid,
  paymentType: billingInfo.payment?.paymentType,
  paymentTypeTitle: billingInfo.payment?.$paymentType,
  invoiceMethod:
    billingInfo.invoiceMethod &&
    `${billingInfo.invoiceMethod.charAt(0).toUpperCase()}${billingInfo.invoiceMethod.slice(1).toLocaleLowerCase()}`,
});
