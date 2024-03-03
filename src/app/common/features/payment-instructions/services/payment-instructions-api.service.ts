import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentInstructionsResponseApiModel } from '@features/payment-instructions/models/api';
import { PaymentMethodEnum } from '@shared/enums';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class PaymentInstructionsApiService {
  constructor(private genericHttpService: GenericHttpService) {}

  public get(paymentMethod: PaymentMethodEnum): Observable<PaymentInstructionsResponseApiModel> {
    return this.genericHttpService
      .post('service/omnichannel/order/getPaymentInstructions', {
        getPaymentInstructionsRequest: { paymentMethod },
      })
      .pipe(map((response) => response.getPaymentInstructionsResponse));
  }
}
