import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ProductConfigurationListModel } from '@features/product-checkout-components/models';

@Component({
  selector: 'kv-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationComponent implements OnChanges {
  @Input()
  public isReadonly: boolean;

  @Input()
  public title: string;

  @Input()
  public productConfiguration: ProductConfigurationListModel[];

  public useCustomerAddress: boolean;
  public userCustomerNames = ['stateOrProvince', 'locality', 'address', 'postalCode'];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['productConfiguration']) {
      this.useCustomerAddress = !!this.productConfiguration?.find((conf) => conf.name === 'useCustomerAddress')?.value;
    }
  }
}
