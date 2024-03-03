import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerComponent, SpinnerCoverComponent, SpinnerCoverContainerComponent } from './components';

@NgModule({
  declarations: [SpinnerCoverContainerComponent, SpinnerComponent, SpinnerCoverComponent],
  exports: [SpinnerCoverContainerComponent, SpinnerComponent, SpinnerCoverComponent],
  imports: [CommonModule],
})
export class SpinnerModule {}
