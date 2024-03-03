import { Observable } from 'rxjs';

import { ValueEnum } from '@features/product-checkout-components/enums';
import { ProductAttributeTypeEnum } from '@features/product-details/enums';
import { KeyValueModel } from '@shared/models';

export interface ProductConfigurationListModel {
  name: string;
  value: string;
  text?: string;
  type?: ValueEnum;
  attributeType?: ProductAttributeTypeEnum;
  referenceName?: string;
  options$?: Observable<KeyValueModel[]>;
}
