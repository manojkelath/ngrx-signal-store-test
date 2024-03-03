export enum AppRoutesEnum {
  DEFAULT = 'product',

  MARKETSPACE = 'product',

  // ROOT pages
  AUTH = 'auth',
  PRODUCT = 'product',
  DELIVERY_CONFIRMATION = 'delivery-confirmation',
  ACCOUNT = 'account',

  // ROOT->DEALS sub pages
  PRODUCT_DETAILS = 'details',
  PRODUCT_CONFIGURE = 'configure',
  PRODUCT_CART = 'cart',
  PRODUCT_PAYMENT = 'payment',
  PRODUCT_CONFIRMATION = 'confirmation',
  PRODUCT_CATALOG = 'catalog',
  PRODUCT_ERROR_PAGE = 'error-page',

  // Account
  ACCOUNT_ORDERS = 'orders',
  ACCOUNT_WAITING_PAYMENT = 'waiting-payment',
  ACCOUNT_SUBSCRIPTIONS = 'subscriptions',
  ACCOUNT_INVOICES = 'invoices',
  ACCOUNT_ISSUES = 'issues',

  // Account -> Profile tabs
  ACCOUNT_PROFILE = 'profile',
  ACCOUNT_ADDRESS = 'address',
  ACCOUNT_CONTACTS = 'contacts',
  ACCOUNT_BILLING = 'billing',
  ACCOUNT_COMMUNICATION = 'communication',

  // Account -> Address sub pages
  ACCOUNT_ADDRESS_CREATE = 'create',
  ACCOUNT_ADDRESS_EDIT = 'edit',

  // Account -> Contacts sub pages
  ACCOUNT_CONTACTS_CREATE = 'create',
  ACCOUNT_CONTACTS_EDIT = 'edit',

  // Account -> Issues sub pages
  ACCOUNT_ISSUES_CREATE = 'create',
}
