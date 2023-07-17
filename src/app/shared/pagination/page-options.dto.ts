import { Order } from './constants/order.constant';

export interface PageOptionsDto {
  page: number;
  take: number;
  order: Order;
}
