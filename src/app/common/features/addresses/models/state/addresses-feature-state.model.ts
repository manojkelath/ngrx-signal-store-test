import { AddressLocationResponseApiModel } from '@features/addresses/models/api';
import { EntityStateModel } from '@shared/entity-state/models';

export interface AddressesFeatureStateModel extends EntityStateModel<AddressLocationResponseApiModel> {
  isLoaded: boolean;
}
