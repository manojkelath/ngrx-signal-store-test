import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kv-terms-from-html',
  templateUrl: './terms-from-html.component.html',
  styleUrls: ['./terms-from-html.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TermsFromHtmlComponent {
  @Input() public terms: string;
}
