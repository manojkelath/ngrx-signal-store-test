import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { OrderTypeEnum } from '@features/order/enums';
import {
  CreateOrderNotePayloadModel,
  DeleteOrderResponseApiModel,
  OrderApiModel,
  OrderResponseApiModel,
} from '@features/order/models/api';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class OrderApiService {
  constructor(private http: GenericHttpService) {}

  public addOrderNote({ topic, content }: CreateOrderNotePayloadModel): Observable<any> {
    return this.http.post('service/order/manage/createTopic', {
      createTopicRequest: {
        topic,
        post: {
          content,
        },
      },
    });
  }

  public updateOrder(order: any): Observable<OrderResponseApiModel | OrderApiModel> {
    return this.http
      .post('service/omnichannel/order/priceCart', {
        order,
      })
      .pipe(map((response) => response?.orderResponse || response));
  }

  public getOrder(id: string): Observable<OrderResponseApiModel> {
    return this.http
      .get(`service/omnichannel/order/getOrder`, { id })
      .pipe(map(({ orderResponse }: { orderResponse: OrderResponseApiModel }) => orderResponse));
  }

  public getOrderId(): Observable<string | undefined> {
    return this.http
      .get(`service/order/manage/getCart`)
      .pipe(map((response: any) => response?.getCartResponse?.orderId));
  }

  public createOrder(
    cart: any,
    organization: string,
    organizationName: string,
    orderType: OrderTypeEnum = OrderTypeEnum.COMDEFAULT
  ) {
    return this.http.post('service/order/manage/createOrder', {
      order: {
        ...cart,
        $orderState: 'New',
        type: 'ORDER',
        orderState: 'CART',
        orderType,
        repriceOnOpen: true,
        locked: false,
        orderPriority: 4,
        customerInfo: {
          customerName: organizationName,
          customerPartyRoleId: organization,
          customerType: 'ORGANIZATION',
          type: 'CUSTOMER',
          __metadata: { type: 'com.kloudville.order.model.customerInfo' },
        },
        __metadata: {
          type: 'com.kloudville.order.model.order',
          displayName: 'Order null',
          access: { type: 'READONLY' },
        },
      },
    });
  }

  public deleteOrder(): Observable<DeleteOrderResponseApiModel> {
    return this.http
      .get('service/omnichannel/order/deleteCart')
      .pipe(map(({ deleteCartResponse }: { deleteCartResponse }) => deleteCartResponse));
  }
}
