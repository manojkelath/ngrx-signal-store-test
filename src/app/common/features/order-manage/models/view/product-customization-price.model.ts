import { RecurrenceEnum } from '@shared/enums';

export interface ProductCustomizationPriceModel {
  amount: number;
  recurrence: RecurrenceEnum;
  currency: string;
  promoType?: string;
  regularPrice?: number;
}
