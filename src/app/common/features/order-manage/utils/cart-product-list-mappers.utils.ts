import { environment } from '@environment';

import { CartDetailsModel } from '@features/order-manage//models/view';

export const mapCartProductList = (cart): CartDetailsModel => {
  if (!cart) {
    return null;
  }

  return {
    products: [...(cart?.product || []), ...(cart?.charge || []).filter((item) => item.shippingCharge)].map((item) => ({
      currency: item.currency,
      recurrence: item.recurrence,
      description: item.description,
      smallImage: item.smallImage
        ? `${environment.hostAssets}${item.smallImage}`
        : `${environment.assetsFolder}images/empty-box.png`,
      shippingCharge: item?.shippingCharge,
      bundleTotalOT: item?.bundleTotalOT,
      itemTotal: item?.bundleTotal || item?.itemTotal,
    })),
    cartPrice: {
      total: cart.grandTotal?.grandTotal || cart.grandTotal?.total || 0,
      currency: cart.product?.[0]?.currency,
    },
  };
};
