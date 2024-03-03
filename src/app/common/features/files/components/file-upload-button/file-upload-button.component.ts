import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { IFileUploadConfigModel } from '@features/files/models';
import { FileUploadService } from '@features/files/services';

@Component({
  selector: 'kv-file-upload-button',
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadButtonComponent {
  @Input()
  public config: IFileUploadConfigModel;

  @Input()
  public isFullWidth: boolean;

  @Output()
  public uploaded: EventEmitter<File> = new EventEmitter();

  @ViewChild('fileInput')
  public fileInput: ElementRef;

  public fileName: string;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  constructor(
    private fileUploadService: FileUploadService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onButtonClick(): void {
    this.appGoogleAnalyticsService.event({
      event: 'choose_files_to_upload_button_click',
      category: this.googleAnalyticsCategoryEnum.GENERAL,
    });
  }

  public uploadFiles(event: Event): void {
    this.appGoogleAnalyticsService.event({
      event: 'upload_files',
      category: this.googleAnalyticsCategoryEnum.GENERAL,
    });
    const files = (event.target as HTMLInputElement).files;

    if (!files.length) {
      return;
    }

    const file = files[0];
    this.fileName = file.name;

    this.fileUploadService
      .validateFile(file, this.config)
      .pipe(take(1))
      .subscribe((base64file) => {
        this.uploaded.emit(base64file);
      });

    if (this.fileInput?.nativeElement) {
      // Fixes same file upload twice by resetting internal input[type="file"] element
      this.fileInput.nativeElement.value = '';
    }
  }
}
