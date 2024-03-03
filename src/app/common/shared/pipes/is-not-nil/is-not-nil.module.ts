import { NgModule } from '@angular/core';

import { IsNotNilPipe } from './is-not-nil.pipe';

@NgModule({
  declarations: [IsNotNilPipe],
  exports: [IsNotNilPipe],
})
export class IsNotNilPipeModule {}
