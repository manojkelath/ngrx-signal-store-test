import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ErrorHandlerService } from '@features/error-handler';
import { mapApiErrorToString } from '@features/error-handler/utils';
import { FILE_CONTENT_TYPE, MAX_FILE_SIZE, NOT_ALLOWED_IMAGE_TYPE } from '@features/files/constants';
import { FileTypeEnum } from '@features/files/enums';
import { IFileUploadConfigModel } from '@features/files/models';
import { formatBytes } from '@features/files/utils';
import { SpinnerCoverService } from '@features/spinner';
import { GenericHttpService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(
    private genericHttp: GenericHttpService,
    private rootHttp: HttpClient,
    private spinnerService: SpinnerCoverService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  public uploadMultipleFiles(files: any[], isDocument = false) {
    if (files.length) {
      this.spinnerService.start();
      this.errorHandlerService.hide();
    }

    return forkJoin(files?.map((file) => this.uploadFile(file, false, isDocument))).pipe(
      map((fileUrls) => (fileUrls || []).filter((url) => !!url)),
      this.spinnerService.endInSequence()
    );
  }

  public validateFile(file: File, expectedFileConfig: IFileUploadConfigModel): Observable<File> {
    if (expectedFileConfig.maxFileSize && formatBytes(file.size) > expectedFileConfig.maxFileSize) {
      this.errorHandlerService.newError(`File size must be below ${MAX_FILE_SIZE}mb`);
      return of(null);
    }

    const [fileType, fileTypeExtension] = file.type.split('/');
    if (!expectedFileConfig.types.includes(<FileTypeEnum>fileType)) {
      this.errorHandlerService.newError(`File type must be ${expectedFileConfig.types.join(' or ')}`);
      return of(null);
    }

    if (expectedFileConfig.format.indexOf(fileTypeExtension) === -1) {
      this.errorHandlerService.newError(`${fileTypeExtension} format is not allowed`);
      return of(null);
    }

    return of(file);
  }

  // TODO: add support for different file types
  public uploadFile(file: any, isWithSpinner = true, isDocument = false) {
    if (!isDocument) {
      if (formatBytes(file.size) > MAX_FILE_SIZE) {
        this.errorHandlerService.newError(`File size must be below ${MAX_FILE_SIZE}mb`);
        return of('');
      }

      const [fileType, fileTypeExtension] = file.type.split('/');
      if (fileType !== FileTypeEnum.IMAGE) {
        this.errorHandlerService.newError(`File type must be an ${FileTypeEnum.IMAGE}`);
        return of('');
      }

      if (NOT_ALLOWED_IMAGE_TYPE.includes(fileTypeExtension)) {
        this.errorHandlerService.newError(`${fileTypeExtension} format is not allowed`);
        return of('');
      }
    }

    const name = file.name;
    const [fileName, fileExtension] = name.split('.');

    if (isWithSpinner) {
      this.spinnerService.start();
      this.errorHandlerService.hide();
    }

    const fixedContentType = file.type !== '' ? file.type : FILE_CONTENT_TYPE[fileExtension];

    const newFileInstance = <File>Object.assign(new Blob([file], { type: fixedContentType }), { name: fileName });

    return this.genericHttp
      .post('service/files/start-upload', {
        name: name,
        contentType: fixedContentType,
      })
      .pipe(
        switchMap(({ uploadId, uploadUrl }) =>
          this.rootHttp.put(uploadUrl, newFileInstance).pipe(
            // todo: replace url
            map(() => `${'environment.filesStorage'}/${fileName}_${uploadId}.${fileExtension}`),
            catchError((err) => {
              this.errorHandlerService.newError(mapApiErrorToString(err));
              return of('');
            })
          )
        ),
        catchError((err) => {
          this.errorHandlerService.newError(mapApiErrorToString(err));
          return of('');
        }),
        tap(() => isWithSpinner && this.spinnerService.end())
      );
  }
}
