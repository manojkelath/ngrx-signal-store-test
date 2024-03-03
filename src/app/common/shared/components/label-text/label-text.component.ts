import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'kv-label-text',
  templateUrl: './label-text.component.html',
  styleUrls: ['./label-text.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelTextComponent implements OnChanges {
  @Input()
  @HostBinding('style.backgroundColor')
  public backgroundColor = '#2c526e';

  @Input()
  @HostBinding('style.color')
  public color = '#ffffff';

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['backgroundColor'] && !this.backgroundColor) {
      this.backgroundColor = '#2c526e';
    }
  }
}
