import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kv-product-required-items',
  templateUrl: './product-required-items.component.html',
  styleUrls: ['./product-required-items.component.scss'],
  imports: [NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRequiredItemsComponent {
  @Input() public errorMessages: string[];
}
