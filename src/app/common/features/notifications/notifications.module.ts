import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { IconComponent } from '@shared/components/icon';

import { NotificationComponent } from './components';

@NgModule({
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  imports: [CommonModule, IconComponent, TranslocoModule],
})
export class NotificationModule {}
