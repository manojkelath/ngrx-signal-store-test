import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';

import { IconComponent } from '@shared/components/icon';
import { PriceComponent } from '@shared/components/price';
import { ProductRequiredItemsComponent } from '@shared/components/product-required-items';
import { PricePipeModule, ValueByKeyPipe } from '@shared/pipes';

import {
  AddonsComponent,
  AddonsItemComponent,
  BundleItemsComponent,
  CartPriceDetailsComponent,
  ChargesComponent,
  ConfigurationComponent,
  ConfigurationItemComponent,
  ProductCheckoutItemComponent,
} from './components';
import { ProductCheckoutPageEffects } from './state/effects';

@NgModule({
  declarations: [
    ProductCheckoutItemComponent,
    AddonsComponent,
    AddonsItemComponent,
    ChargesComponent,
    BundleItemsComponent,
    ConfigurationComponent,
    ConfigurationItemComponent,
    CartPriceDetailsComponent,
  ],
  imports: [
    EffectsModule.forFeature([ProductCheckoutPageEffects]),
    CommonModule,
    IconComponent,
    TranslocoModule,
    PricePipeModule,
    ValueByKeyPipe,
    PriceComponent,
    ProductRequiredItemsComponent,
  ],
  exports: [ProductCheckoutItemComponent, CartPriceDetailsComponent],
})
export class ProductCheckoutComponentsModule {}
