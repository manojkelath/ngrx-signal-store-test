import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { forkJoin, take } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { IFileUploadConfigModel } from '@features/files/models';
import { FileUploadService } from '@features/files/services';

@Component({
  selector: 'kv-file-upload-drag-drop[googleAnalyticsCategory]',
  templateUrl: './file-upload-drag-drop.component.html',
  styleUrls: ['./file-upload-drag-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadDragDropComponent {
  @Input()
  public googleAnalyticsCategory: GoogleAnalyticsCategoryEnum;

  @Input()
  public config: IFileUploadConfigModel;

  @Input()
  public sampleFileUrl: string;

  @Input()
  public isFullWidth: boolean;

  @Input()
  public fileName: string;

  @Input()
  public isError: boolean;

  @Input()
  public isMultiple = false;

  @Input()
  public displayTitle = true;

  @Input()
  public displayPreview = true;

  @Output()
  public uploadedFile: EventEmitter<File | null> = new EventEmitter();

  @Output()
  public uploadedFiles: EventEmitter<File[] | null> = new EventEmitter();

  @ViewChild('fileInput')
  public fileInput: ElementRef;

  public isDragFocus = false;

  constructor(
    private fileUploadService: FileUploadService,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService
  ) {}

  public onButtonClick(): void {
    this.appGoogleAnalyticsService.event({
      event: `choose_files_to_upload_${this.googleAnalyticsCategory}_button_click`,
      category: this.googleAnalyticsCategory,
    });
  }

  public onRemoveFile(): void {
    this.fileName = '';
    this.uploadedFile.emit(null);
    this.appGoogleAnalyticsService.event({
      event: `remove_file_${this.googleAnalyticsCategory}_button_click`,
      category: this.googleAnalyticsCategory,
    });
  }

  public uploadFiles(event: Event): void {
    this.appGoogleAnalyticsService.event({
      event: `upload_files_${this.googleAnalyticsCategory}`,
      category: this.googleAnalyticsCategory,
    });

    const files = (event.target as HTMLInputElement).files;

    if (!files.length) {
      return;
    }

    this.isDragFocus = false;
    if (this.isMultiple) {
      forkJoin(
        Array.from(files).map((itemFile) =>
          this.fileUploadService.validateFile(itemFile, this.config).pipe(
            take(1),
            filter((item) => !!item)
          )
        )
      )
        .pipe(take(1))
        .subscribe((itemsFiles) => {
          if (itemsFiles && itemsFiles.length) {
            this.fileName = Array.from(files)
              .map((item) => item.name)
              .join(', ');
            this.uploadedFiles.emit(itemsFiles);
          } else {
            this.fileName = '';
            this.uploadedFiles.emit(null);
          }
        });
    } else {
      const file = files[0];
      this.fileName = file.name;

      this.fileUploadService
        .validateFile(file, this.config)
        .pipe(take(1))
        .subscribe((base64file) => {
          if (!base64file) {
            this.fileName = '';
            this.uploadedFile.emit(null);
          }

          this.uploadedFile.emit(base64file);
        });
    }

    if (this.fileInput?.nativeElement) {
      // Fixes same file upload twice by resetting internal input[type="file"] element
      this.fileInput.nativeElement.value = '';
    }
  }
}
