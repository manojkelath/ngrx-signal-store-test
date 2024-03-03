import { CustomerApiModel } from '@features/account/models/api';
import { CustomerViewModel } from '@features/account/models/view';

export const customerViewMapperUtil = (customer: CustomerApiModel): CustomerViewModel => ({
  name: customer.contactName,
  customerId: customer.customerId,
  mediumDisplay: customer.contactMediumDisplay,
  mediumDisplay2: customer.contactMediumDisplay2,
});
