import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'kv-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CarouselModule],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements AfterContentInit {
  @Input()
  public options: OwlOptions;

  @Input()
  public optionIds: string[];

  @ContentChildren('carouselSlide')
  public contentChildren!: QueryList<TemplateRef<any>>;

  public slides: any[] = [];

  public ngAfterContentInit(): void {
    this.slides = this.contentChildren.toArray();
  }
}
