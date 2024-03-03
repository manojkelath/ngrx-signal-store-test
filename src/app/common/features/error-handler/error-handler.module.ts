import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { NotificationModule } from '@features/notifications';

import {
  AuthErrorHandlerContainerComponent,
  ChildErrorHandlerContainerComponent,
  ErrorHandlerContainerComponent,
  OverlayErrorHandlerContainerComponent,
  WarningHandlerContainerComponent,
} from './components';
import { ErrorHandlerEffects } from './state/effects';

@NgModule({
  declarations: [
    ErrorHandlerContainerComponent,
    AuthErrorHandlerContainerComponent,
    OverlayErrorHandlerContainerComponent,
    WarningHandlerContainerComponent,
    ChildErrorHandlerContainerComponent,
  ],
  exports: [
    ErrorHandlerContainerComponent,
    AuthErrorHandlerContainerComponent,
    OverlayErrorHandlerContainerComponent,
    WarningHandlerContainerComponent,
    ChildErrorHandlerContainerComponent,
  ],
  imports: [EffectsModule.forFeature([ErrorHandlerEffects]), NotificationModule, CommonModule],
})
export class ErrorHandlerModule {}
