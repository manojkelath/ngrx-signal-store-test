import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { IconComponent } from '@shared/components/icon';
import { ClickOutsideDirective } from '@shared/directives/click-outside';
import { SafePipe } from '@shared/pipes';

import { ActionsDropdownComponent, ConfirmationOverlayComponent, MenuComponent } from './components';

@NgModule({
  declarations: [MenuComponent, ConfirmationOverlayComponent, ActionsDropdownComponent],
  exports: [MenuComponent, ConfirmationOverlayComponent, ActionsDropdownComponent],
  imports: [CommonModule, A11yModule, ClickOutsideDirective, IconComponent, TranslocoModule, SafePipe],
})
export class OverlayFeatureModule {}
