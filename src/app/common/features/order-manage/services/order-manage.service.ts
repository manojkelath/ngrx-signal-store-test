import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import Requals from 'ramda/es/equals';
import Rflatten from 'ramda/es/flatten';
import Rvalues from 'ramda/es/values';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, of, switchMap, withLatestFrom } from 'rxjs';

import { CartService } from '@features/cart-details/services';
import { OrderApiModel } from '@features/order/models/api';
import { OrderWithConfigurableInformationStateModel } from '@features/order/models/state';
import { getOrderDetails, getOrderWithConfigurableInformation } from '@features/order/state/selectors';
import { CartDetailsModel, ProductCustomizationPriceModel } from '@features/order-manage//models/view';
import { mapCartProductList, mapOrder } from '@features/order-manage/utils';
import { getCurrentProductCode } from '@features/product-details/state/selectors';
import { productHasRequestDetailsAction } from '@features/product-details/utils';
import { IAppState } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class OrderManageService {
  private requiredItems$ = new BehaviorSubject<Record<string, string[]>>(null);

  constructor(private cartService: CartService, private store$: Store<IAppState>) {
    setTimeout(() => this.requiredItemsListener());
  }

  public getOrderDetails(): Observable<OrderApiModel> {
    return this.store$
      .pipe(select(getOrderDetails))
      .pipe(
        switchMap((orderDetails) => (orderDetails?.orderId ? of(orderDetails) : this.cartService.getSessionCart()))
      );
  }

  public getOrderDetailsWithConfigurableInformation(): Observable<OrderWithConfigurableInformationStateModel> {
    return this.store$
      .pipe(select(getOrderWithConfigurableInformation))
      .pipe(
        switchMap((orderDetails: OrderWithConfigurableInformationStateModel) =>
          orderDetails?.order?.orderId ? of(orderDetails) : this.cartService.getSessionCartWithConfigurableInformation()
        )
      );
  }

  public getOrderCheckoutDetails(): Observable<any> {
    return this.getOrderDetailsWithConfigurableInformation().pipe(map(mapOrder));
  }

  public getCartDetailForPreview(): Observable<CartDetailsModel> {
    return this.getOrderDetails().pipe(map(mapCartProductList));
  }

  public getCartProductsAmount(): Observable<number> {
    return this.getCartDetailForPreview().pipe(map((cart) => cart?.products?.length));
  }

  public get requiredItemsSub(): Observable<Record<string, string[]>> {
    return this.requiredItems$;
  }

  public get orderRequiredItemsTextsSub(): Observable<string[]> {
    return this.requiredItems$.pipe(map((requiredItems) => Rflatten(Rvalues(requiredItems))));
  }

  public get currentProductRequiredItemsSub(): Observable<string[]> {
    return this.requiredItems$.pipe(
      withLatestFrom(this.getProductIdByProductCode()),
      map(([requiredItems, currentProductId]) => requiredItems?.[currentProductId] || [])
    );
  }

  public getProductIdByProductCode(): Observable<string> {
    return this.getOrderDetails().pipe(
      filter((order) => !!order),
      withLatestFrom(this.store$.pipe(select(getCurrentProductCode))),
      map(
        ([{ product }, currentProductCode]) =>
          (product || []).find((productItem) => productItem.productCode === currentProductCode)?.productId || ''
      )
    );
  }

  public getOrderProduct(productCode: string) {
    return this.getOrderDetails().pipe(
      map((cart) => cart?.product?.find((product) => product.productCode === productCode)),
      distinctUntilChanged()
    );
  }

  public getOrderProductPrice(productCode: string): Observable<ProductCustomizationPriceModel[]> {
    return this.getOrderProduct(productCode).pipe(
      distinctUntilChanged((prev, curr) => Requals(prev, curr)),
      map((product) => {
        if ((Number(product?.bundleTotal || product?.itemTotal) || 0) < 1) {
          return [];
        }

        const priceByRecurrence: Record<string, ProductCustomizationPriceModel> = (product?.charge || []).reduce(
          (acc, charge) => {
            acc = {
              ...acc,
              ...(acc[charge?.recurrence]
                ? {
                    [charge?.recurrence]: {
                      ...acc[charge?.recurrence],
                      amount: acc[charge?.recurrence].amount + Number(charge?.itemTotal) || 0,
                    },
                  }
                : {
                    [charge?.recurrence]: {
                      amount: charge?.itemTotal || 0,
                      recurrence: charge?.recurrence,
                      currency: product?.currency,
                    },
                  }),
            };

            return acc;
          },

          {
            [product?.recurrence]: {
              amount: Number(product?.bundleTotal || product?.itemTotal) || 0,
              recurrence: product?.recurrence,
              currency: product?.currency,
            },
          }
        );

        return Object.values(priceByRecurrence);
      })
    );
  }

  public getOrderProductsCount$(): Observable<number> {
    return this.getOrderDetails().pipe(map((cart) => cart?.product?.length || 0));
  }

  public isOrder$(): Observable<boolean> {
    return this.getOrderDetails().pipe(map((cart) => !!cart?.cartTotal));
  }

  public isRequestDetailProductOrder$(): Observable<boolean> {
    return this.getOrderDetails().pipe(
      map((cart) => (cart?.product ?? []).every((item) => productHasRequestDetailsAction(item)))
    );
  }

  public getOrderTotalPrice(): Observable<ProductCustomizationPriceModel[]> {
    return this.getOrderDetails().pipe(
      distinctUntilChanged((prev, curr) => Requals(prev, curr)),
      map((cart) =>
        (cart?.grandTotal?.grandTotal || cart?.grandTotal?.total || 0) < 1
          ? []
          : cart?.cartTotal.reduce(
              (acc, cartTotal) => {
                acc = [
                  {
                    amount: cartTotal?.grandTotal || cartTotal?.total || 0,
                    recurrence: cartTotal?.recurrence,
                    currency: cart?.currency,
                  },
                  ...acc,
                ];

                return acc;
              },
              [
                {
                  amount: cart?.grandTotal?.grandTotal || cart?.grandTotal?.total || 0,
                  recurrence: undefined,
                  currency: cart?.currency,
                },
              ]
            )
      )
    );
  }

  public isCurrentProductInOrder$(): Observable<boolean> {
    return this.getOrderDetails().pipe(
      withLatestFrom(this.store$.pipe(select(getCurrentProductCode))),
      map(
        ([cart, currentProductCode]) =>
          !!cart?.product?.filter((product) => product.productCode === currentProductCode)?.length
      )
    );
  }

  public getCurrentProductCartPriceCode$(): Observable<string | undefined> {
    return this.getOrderDetails().pipe(
      withLatestFrom(this.store$.pipe(select(getCurrentProductCode))),
      map(
        ([cart, currentProductCode]) =>
          cart?.product?.find((product) => product.productCode === currentProductCode)?.priceCode
      )
    );
  }

  public getOrderProductsCodes(): Observable<Record<string, boolean>> {
    return this.getOrderDetails().pipe(
      map((cart) =>
        cart?.product?.reduce((acc, product) => {
          acc[product.productCode] = true;
          return acc;
        }, {})
      )
    );
  }

  public isOrderProductsErrorMessages$(): Observable<boolean> {
    return this.getOrderDetails().pipe(
      map((cart) => (cart?.cartTotal || []).some((cartTotal) => !!cartTotal?.message?.length))
    );
  }

  public isOrderProductErrorMessages$(productCode: string): Observable<boolean> {
    return this.getOrderDetails().pipe(
      map((cart) => {
        const cartProduct = (cart?.product || []).find((product) => product.productCode === productCode);
        if (cartProduct && cartProduct?.productId) {
          for (const cartTotal of cart?.cartTotal || []) {
            return cartTotal?.message?.some((messageItem) => {
              if (messageItem?.itemId === cartProduct?.productId) {
                return true;
              }

              return (cartProduct?.bundleItem || []).some((bundle) => bundle.productId === messageItem.errorItemId);
            });
          }
        }

        return false;
      })
    );
  }

  public getProductCodeContainingErrors$(): Observable<string | null> {
    return this.getOrderDetails().pipe(
      map((cart: any) => {
        for (const cartTotal of cart?.cartTotal || []) {
          if (cartTotal?.message?.length) {
            const errorItemId = cartTotal?.message.find((message) => message.itemId)?.itemId;

            if (!errorItemId) {
              return null;
            }

            return (
              (cart?.product || []).find((product) => {
                if (product.productId === errorItemId) {
                  return product;
                }

                for (const bundle of product?.bundleItem || []) {
                  if (bundle.productId === errorItemId) {
                    return product;
                  }
                }
              })?.productCode || null
            );
          }
        }

        return null;
      })
    );
  }

  public getOrderProducts$(): Observable<Record<string, any>> {
    return this.getOrderDetails().pipe(
      map((cart) =>
        (cart?.product || []).reduce((acc, product) => {
          acc[product.productCode] = product;
          return acc;
        }, {})
      )
    );
  }

  private requiredItemsListener(): void {
    this.getOrderDetails().subscribe((cart) => {
      this.requiredItems$.next(
        cart?.requiredItem?.length
          ? cart.requiredItem.reduce((acc, messageItem) => {
              for (const product of cart?.product || []) {
                if (product.productId === messageItem.itemId) {
                  acc[messageItem.itemId] = [...(acc[messageItem.itemId] || []), messageItem.message];
                  break;
                } else {
                  const addon = (product.addOnItem || []).find(
                    (addonItem) => addonItem.productId === messageItem.itemId
                  );
                  if (addon) {
                    acc[product.productId] = [...(acc[product.productId] || []), messageItem.message];
                    break;
                  }
                }
              }

              return acc;
            }, {})
          : null
      );
    });
  }

  public getCurrentProductSelectedAddonsIds$(): Observable<Record<string, boolean>> {
    return this.getOrderDetails().pipe(
      withLatestFrom(this.store$.pipe(select(getCurrentProductCode))),
      filter(([, productCode]) => !!productCode),
      map(([cart, productCode]) => {
        const currentProduct = cart?.product?.find((product) => product.productCode === productCode);
        return (currentProduct?.addOnItem || []).reduce((acc, addon) => {
          acc[addon.productCode] = true;
          return acc;
        }, {});
      })
    );
  }
}
