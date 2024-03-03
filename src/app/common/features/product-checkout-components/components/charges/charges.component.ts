import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'kv-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargesComponent {
  @Input() public charges = [];
  @Input() public currency: string;
}
