import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { OverlayFeatureModule } from '@features/overlay';
import { IconComponent } from '@shared/components/icon';
import { MouseLeaveDirective } from '@shared/directives/mouse-leave';
import { PricePipeModule } from '@shared/pipes';

import {
  CartDetailsComponent,
  CartDetailsContainerComponent,
  CartProductListPopupComponent,
  CartProductListPopupContainerComponent,
} from './components';

@NgModule({
  declarations: [
    CartDetailsContainerComponent,
    CartDetailsComponent,
    CartProductListPopupContainerComponent,
    CartProductListPopupComponent,
  ],
  exports: [CartDetailsContainerComponent],
  imports: [CommonModule, PricePipeModule, IconComponent, TranslocoModule, OverlayFeatureModule, MouseLeaveDirective],
})
export class CartDetailsFeatureModule {}
