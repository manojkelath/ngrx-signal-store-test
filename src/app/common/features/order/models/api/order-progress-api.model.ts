import { OrderStatusApiEnum } from '@features/account/enums';

export interface OrderProgressApiModel {
  startTime: string;
  endTime: string;
  status: OrderStatusApiEnum;
  $status: string;
  startedBy: string;
  $startedBy: string;
  completedBy: string;
  $completedBy: string;
}
