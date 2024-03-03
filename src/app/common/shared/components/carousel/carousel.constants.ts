/* eslint-disable @typescript-eslint/naming-convention */
import { OwlOptions } from 'ngx-owl-carousel-o';

import { environment } from '@environment';

export const CAROUSEL_DEFAULT_OPTIONS: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 500,
  dragEndSpeed: 500,
  nav: true,
  navText: [
    `<img src="${environment.assetsFolder}icons/chevron-left.svg" alt="chevron-left"></img>`,
    `<img src="${environment.assetsFolder}icons/chevron-right.svg" alt="chevron-right"></img>`,
  ],
  margin: 14,
};
