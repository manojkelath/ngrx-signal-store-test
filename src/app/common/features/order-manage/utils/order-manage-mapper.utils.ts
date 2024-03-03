import { environment } from '@environment';

import { OrderWithConfigurableInformationStateModel } from '@features/order/models/state';
import { cartProductWithBundleCheckRequiresCustomizationFn } from '@features/product-checkout-components/utils';
import { PAYMENT_METHOD_ICON } from '@shared/constants';

export const mapOrder = (orderDetails: OrderWithConfigurableInformationStateModel) => {
  if (!orderDetails?.order) {
    return null;
  }

  return {
    lastPricedDate: orderDetails.order.lastPricedDate || null,
    paymentType: orderDetails.order.paymentInfo?.checkoutPaymentType
      ? PAYMENT_METHOD_ICON[orderDetails.order.paymentInfo?.checkoutPaymentType]
      : null,
    products: (orderDetails.order?.product || []).map((item) => ({
      ...item,
      smallImage: item.smallImage
        ? `${environment.hostAssets}${item.smallImage}`
        : `${environment.assetsFolder}images/empty-box.png`,
      isCustomizable: cartProductWithBundleCheckRequiresCustomizationFn(
        item,
        orderDetails.orderConfigurableInformation
      ),
    })),
    cartPrice: {
      total: orderDetails.order.grandTotal?.grandTotal || orderDetails.order.grandTotal?.total || 0,
      currency: orderDetails.order.product?.[0]?.currency,
      recurrence: orderDetails.order.product?.[0]?.recurrence,
    },
    cartPriceDetails: orderDetails.order?.cartTotal || [],
    requiredItems: orderDetails.order.requiredItem?.map((item) => ({
      productId: item.itemId,
      message: item.message,
    })),
    currency: orderDetails.order?.currency,
  };
};
