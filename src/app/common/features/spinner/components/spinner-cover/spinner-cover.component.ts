import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'kv-spinner-cover',
  templateUrl: './spinner-cover.component.html',
  styleUrls: ['./spinner-cover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerCoverComponent {
  // @Input() public isLoading: boolean;
}
