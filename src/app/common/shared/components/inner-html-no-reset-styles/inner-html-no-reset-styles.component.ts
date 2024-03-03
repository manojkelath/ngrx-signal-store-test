import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kv-inner-html-no-reset-styles',
  templateUrl: './inner-html-no-reset-styles.component.html',
  styleUrls: ['./inner-html-no-reset-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InnerHtmlNoResetStylesComponent {
  @Input() public htmlValue: string;
}
