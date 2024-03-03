import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IconComponent } from '@shared/components/icon';

@Component({
  standalone: true,
  selector: 'kv-radial-progress-bar',
  templateUrl: './radial-progress-bar.component.html',
  styleUrls: ['./radial-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, IconComponent],
})
export class RadialProgressBarComponent {
  @Input()
  public progressValue = 0;

  @Input()
  public isCompleted: boolean;

  @Input()
  public isCancelled: boolean;

  @Input()
  public isSmall: boolean;
}
