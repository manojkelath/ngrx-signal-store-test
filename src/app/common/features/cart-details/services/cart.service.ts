import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { CART_INFORMATION_STORAGE_KEY, CART_STORAGE_KEY } from '@features/cart-details/constants';
import { OrderApiModel, OrderConfigurableProductApiModel } from '@features/order/models/api';
import { OrderWithConfigurableInformationStateModel } from '@features/order/models/state';
import { SessionStorageService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$ = new BehaviorSubject<any>(this.sessionStorageService.getItem(CART_STORAGE_KEY, true));
  private cartConfigurableInformation$ = new BehaviorSubject<any>(
    this.sessionStorageService.getItem(CART_INFORMATION_STORAGE_KEY, true)
  );

  constructor(private sessionStorageService: SessionStorageService) {}

  public setSessionCart(cart: OrderApiModel, orderConfigurableInformation: OrderConfigurableProductApiModel[]) {
    this.sessionStorageService.setItem(CART_STORAGE_KEY, cart, true);
    this.cart$.next(cart);

    if (orderConfigurableInformation) {
      this.sessionStorageService.setItem(CART_INFORMATION_STORAGE_KEY, orderConfigurableInformation || null, true);
      this.cartConfigurableInformation$.next(orderConfigurableInformation);
    }
  }

  public setSessionCartWithoutConfigurableInformation(cart: OrderApiModel) {
    this.sessionStorageService.setItem(CART_STORAGE_KEY, cart, true);
    this.cart$.next(cart);
  }

  public getSessionCartValue(): any {
    return this.cart$.value;
  }

  public getSessionCart(): Observable<any> {
    return this.cart$;
  }

  public getSessionCartWithConfigurableInformation(): Observable<OrderWithConfigurableInformationStateModel> {
    return combineLatest([this.cart$, this.cartConfigurableInformation$]).pipe(
      map(([cart, cartConfigurableInformation]) => ({
        order: cart,
        orderConfigurableInformation: cartConfigurableInformation,
      }))
    );
  }

  public clear(): void {
    this.sessionStorageService.removeItem(CART_STORAGE_KEY);
    this.sessionStorageService.removeItem(CART_INFORMATION_STORAGE_KEY);
    this.cart$.next(null);
  }
}
