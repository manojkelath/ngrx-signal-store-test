import { createActionGroup, emptyProps } from '@ngrx/store';

export const InitActions = createActionGroup({
  source: 'App',
  events: {
    'Page Initialized': emptyProps(),
    'Page Logged In Initialized': emptyProps(),
    'Login page initialized': emptyProps(),
    'Shop Page Initialized': emptyProps(),
    'Product Details Page Initialized': emptyProps(),
    'Product Checkout Page Initialized': emptyProps(),
    'Product Payment Page initialized': emptyProps,
    'Product Confirmation Page Initialized': emptyProps(),
    'Add Shipping Address Page initialized': emptyProps(),
    'Product Customize Page Initialized': emptyProps(),
    'Product Catalog Page Initialized': emptyProps(),
    'Delivery Confirmation Page Initialized': emptyProps(),
    'Address Page Initiated': emptyProps(),
    'Address Create Edit Page Initiated': emptyProps(),
    'Contact Edit Page Initialized': emptyProps(),
    'Billing Accounts Page Initialized': emptyProps(),
    'Issue Create page Initialized': emptyProps(),
    'Waiting Payment Page Initiated': emptyProps(),
  },
});
