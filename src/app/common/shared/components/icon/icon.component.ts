import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { environment } from '@environment';

import { InlineSVGModule } from 'ng-inline-svg-2';

@Component({
  standalone: true,
  selector: 'kv-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  imports: [InlineSVGModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  @Input()
  public svgPath: string;

  @Input()
  public size: string;

  @Input()
  public verticalSize: string;

  @Input()
  public customSvgAttributes: { [key: string]: any };

  public svg: string;
  public sizeClass: string;

  public ngOnChanges() {
    this.svg = this.svgPath ? `${environment.assetsFolder}icons/${this.svgPath}` : '';
    this.sizeClass = this.size ? `width-${this.size}` : '';
    this.sizeClass = this.verticalSize ? `height-${this.verticalSize}` : '';
  }
}
