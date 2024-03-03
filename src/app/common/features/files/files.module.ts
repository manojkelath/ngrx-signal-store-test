import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { AppGaEventDirective } from '@features/app-google-analytics/directives';
import { IconComponent } from '@shared/components/icon';

import { FileUploadButtonComponent, FileUploadDragDropComponent } from './components';

@NgModule({
  declarations: [FileUploadButtonComponent, FileUploadDragDropComponent],
  exports: [FileUploadButtonComponent, FileUploadDragDropComponent],
  imports: [CommonModule, IconComponent, TranslocoTestingModule, AppGaEventDirective],
})
export class FilesFeatureModule {}
