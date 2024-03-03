import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NO_PRODUCT_CONFIGURATION_VALUE } from '@features/product-checkout-components/constants';
import { ValueEnum } from '@features/product-checkout-components/enums';
import { ProductAttributeTypeEnum } from '@features/product-details/enums';
import { PIPE_FORMATS } from '@shared/constants';
import { KeyValueModel } from '@shared/models';

@Component({
  selector: 'kv-configuration-item',
  templateUrl: './configuration-item.component.html',
  styleUrls: ['./configuration-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationItemComponent {
  @Input()
  public titleText: string;

  @Input()
  public valueText: string;

  @Input()
  public valueType: ValueEnum;

  @Input()
  public attributeType: ProductAttributeTypeEnum;

  @Input()
  public isReadonly: boolean;

  @Input()
  public configurationOptions: KeyValueModel[];

  public fieldTypes = ValueEnum;
  public attributeTypeEnum = ProductAttributeTypeEnum;
  public pipeFormats = PIPE_FORMATS;
  public noValueType = NO_PRODUCT_CONFIGURATION_VALUE;
}
