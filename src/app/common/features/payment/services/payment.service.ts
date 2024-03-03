import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { GetPaymentApprovalStatusApiModel, IPaymentMethodModel } from '@features/payment/models';
import { PAYMENT_METHOD_ICON } from '@shared/constants';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private genericHttpService: GenericHttpService) {}

  // haven't used for now
  // methods are hardcoded for reducing api call on payment page loading
  public getPaymentMethods(): Observable<IPaymentMethodModel[]> {
    return this.genericHttpService.get(`service/customer/account/getPaymentMethods`).pipe(
      map((response: any) =>
        response.paymentMethodList.paymentMethod.map((method: any) => ({
          description: method.paymentType,
          paymentType: method.paymentType,
          icon: PAYMENT_METHOD_ICON[method.paymentType],
        }))
      )
    );
  }

  public getAccountList(organization: string) {
    return this.genericHttpService
      .post('service/customer/account/getAccountList', {
        accountRequest: {
          create: true,
          customerId: organization,
          valid: true,
          currency: 'IDR',
          __metadata: {
            type: 'com.kloudville.account.accountRequest',
          },
        },
      })
      .pipe(map((response) => response.accountList));
  }

  public checkoutPayment(accountId: string, cart: any) {
    return this.genericHttpService
      .post('service/order/manage/checkoutPayment', {
        checkoutPaymentRequest: {
          accountId,
          cart,
        },
      })
      .pipe(map(({ checkoutPaymentResponse }) => checkoutPaymentResponse));
  }

  public getPaymentApproval(approvalRequest: any) {
    return this.genericHttpService
      .post('service/omnichannel/order/getPaymentApproval', { approvalRequest })
      .pipe(map(({ getPaymentApprovalResponse }) => getPaymentApprovalResponse));
  }

  public getPaymentApprovalStatus(paymentOption: GetPaymentApprovalStatusApiModel) {
    return this.genericHttpService
      .get('service/omnichannel/order/getPaymentApprovalStatus', {
        paymentType: paymentOption.paymentType,
        paymentToken: paymentOption.paymentToken,
        returnUrl: paymentOption.returnUrl,
      })
      .pipe(
        map(
          ({ getPaymentApprovalStatusResponse }: { getPaymentApprovalStatusResponse }) =>
            getPaymentApprovalStatusResponse
        )
      );
  }

  public initiateOrder(order: any) {
    return this.genericHttpService.post('service/order/manage/initiateOrder', {
      order: {
        __metadata: {
          type: 'com.kloudville.order.model.order',
        },
        ...order,
      },
    });
  }

  public validateRegistrationStatus(order: any): Observable<any> {
    return (
      this.genericHttpService
        .post('service/omnichannel/order/validateRegistrationStatus', { order })
        // eslint-disable-next-line @typescript-eslint/naming-convention
        .pipe(map(({ ValidateRegistrationResult }) => ValidateRegistrationResult))
    );
  }
}
