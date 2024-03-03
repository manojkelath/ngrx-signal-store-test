import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

import { AddressCreateEditFromControlNameEnum } from '@features/addresses/enums';
import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { MAX_FILE_SIZE } from '@features/files/constants';
import { FileTypeEnum } from '@features/files/enums';
import { IFileUploadConfigModel } from '@features/files/models';
import { ISelectOptionModel } from '@features/select';
import { ADDRESS_ERRORS, DEFAULT_INPUT_ERRORS } from '@shared/constants';
import { dateFormatter, getControlErrors } from '@shared/utils';

@Component({
  selector: 'kv-add-user-identification-form',
  templateUrl: './add-user-identification-form.component.html',
  styleUrls: ['./add-user-identification-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserIdentificationFormComponent implements OnInit {
  @Input()
  public form: FormGroup;

  @Input()
  public isSubmitted: boolean;

  @Input()
  public provincesList: ISelectOptionModel[] = [];

  @Input()
  public citiesList: ISelectOptionModel[] = [];

  @Input()
  public districtsList: ISelectOptionModel[] = [];

  @Input()
  public subdistrictsList: ISelectOptionModel[] = [];

  @Input()
  public postalCodesList: ISelectOptionModel[] = [];

  @Input()
  public isPostalCodeInput: boolean;

  @Output()
  public provinceChanged: EventEmitter<string> = new EventEmitter<string>();

  public inputErr = {
    ...DEFAULT_INPUT_ERRORS,
    TERMS_ERROR: { required: 'form.terms-required' },
    ...ADDRESS_ERRORS,
  };

  public documentConfig: IFileUploadConfigModel = {
    format: '.jpeg, .jpg, .png',
    types: [FileTypeEnum.IMAGE],
    maxFileSize: MAX_FILE_SIZE,
  };
  public maxDateOfBirth: Date;
  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;
  public addressCreateEditFromControlNameEnum = AddressCreateEditFromControlNameEnum;

  constructor(private translocoService: TranslocoService) {}

  public ngOnInit(): void {
    const date = new Date();

    this.maxDateOfBirth = new Date(
      `${date.getFullYear() - 17}-${dateFormatter(date.getMonth() + 1)}-${dateFormatter(date.getDate())}`
    );
  }

  public onUploadDocument(file: File) {
    this.form.get('IDCARD').setValue(file);
  }

  public onUploadKKDocument(file: File) {
    this.form.get('IDCARD_KK').setValue(file);
  }

  public onUploadSelfie(file: File) {
    this.form.get('SELFIE').setValue(file);
  }

  public getControlErrors(control: AbstractControl, errors: {}): string {
    return this.isSubmitted ? this.translocoService.translate(getControlErrors(control, errors)) : null;
  }
}
