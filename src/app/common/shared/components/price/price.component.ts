import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { PricePipeModule } from '@shared/pipes';

@Component({
  standalone: true,
  selector: 'kv-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  imports: [CommonModule, TranslocoModule, PricePipeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceComponent {
  @Input()
  public value: number;

  @Input()
  public currency: string;

  @Input()
  public recurrence: string;

  @Input()
  public promoType: string;

  @Input()
  public regularPrice: number;

  @Input()
  public isProductCatalogView: boolean;

  @Input()
  public isRightPadding: boolean;

  public get percent(): string {
    return `-${(100 - (+this.value * 100) / +this.regularPrice).toFixed(0)}%`;
  }
}
