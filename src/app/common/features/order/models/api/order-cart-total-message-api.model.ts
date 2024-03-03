import { OrderErrorCodeEnum } from '@features/order/enums';

export interface OrderCartTotalMessageApiModel {
  itemId?: string;
  errorItemId?: string;
  code: OrderErrorCodeEnum;
  source: string;
  text: string;
  type: string;
}
