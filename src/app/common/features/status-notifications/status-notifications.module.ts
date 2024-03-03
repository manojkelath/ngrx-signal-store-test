import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { OverlayFeatureModule } from '@features/overlay';
import { TranslateFeatureModule } from '@features/translate';
import { IconComponent } from '@shared/components/icon';
import { MouseLeaveDirective } from '@shared/directives/mouse-leave';

import {
  PromoAndUpdatesComponent,
  StatusNotificationsContainerComponent,
  StatusNotificationsTabsComponent,
  TransactionsComponent,
} from './components';
import { StatusNotificationsEffects } from './state/effects';
import { statusNotificationsFeatureReducer } from './state/reducers';
import { statusNotificationsFeatureName } from './state/selectors';

@NgModule({
  declarations: [
    StatusNotificationsContainerComponent,
    StatusNotificationsTabsComponent,
    TransactionsComponent,
    PromoAndUpdatesComponent,
  ],
  exports: [StatusNotificationsContainerComponent],
  imports: [
    StoreModule.forFeature(statusNotificationsFeatureName, statusNotificationsFeatureReducer),
    EffectsModule.forFeature([StatusNotificationsEffects]),
    CommonModule,
    TranslocoModule,
    TranslateFeatureModule,
    IconComponent,
    OverlayFeatureModule,
    MouseLeaveDirective,
  ],
})
export class StatusNotificationsFeatureModule {}
