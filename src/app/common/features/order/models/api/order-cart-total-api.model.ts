import { OrderCartTotalMessageApiModel } from './order-cart-total-message-api.model';

export interface OrderCartTotalApiModel {
  total: number;
  grandTotal: number;
  recurrence: string;
  charge?: {
    total: number;
    description: string;
    tax: boolean;
    taxValue: number;
    chargeCode: string;
  }[];
  revenue?: {
    revenueCategory: string;
    revenueType: string;
    recurrence: string;
    total: number;
  }[];
  shipToAddressId: string;
  message?: OrderCartTotalMessageApiModel[];
  shippingOption?: any[]; // TODO: add interface
}
