import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { AppGoogleAnalyticsService } from '@features/app-google-analytics/services';
import { ISelectOptionModel } from '@features/select';
import { DEFAULT_INPUT_ERRORS, EMAIL_REGEX } from '@shared/constants';
import { getControlErrors, phoneValidator, whiteSpaceValidator } from '@shared/utils';

@Component({
  selector: 'kv-lead-register-form',
  templateUrl: './lead-register-form.component.html',
  styleUrls: ['./lead-register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadRegisterFormComponent implements OnDestroy, OnInit {
  @Input() public provinceOptions: ISelectOptionModel[];
  @Input() public cityOptions: ISelectOptionModel[];
  @Input() public isSuccessMessage: boolean;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  public registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX), whiteSpaceValidator]],
    phone: ['', [phoneValidator, Validators.required]],
    province: ['', Validators.required],
    city: ['', Validators.required],
  });

  public inputErr = {
    ...DEFAULT_INPUT_ERRORS,
  };

  public filterBy: string;
  public isSubmitted = false;
  private destroyed$ = new Subject<void>();

  @Output() public submitFormEvent: EventEmitter<any> = new EventEmitter();
  @Output() public closeFormEvent: EventEmitter<void> = new EventEmitter();
  @Output() public provinceChanged: EventEmitter<string> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private appGoogleAnalyticsService: AppGoogleAnalyticsService,
    private translocoService: TranslocoService
  ) {}

  public ngOnInit() {
    this.watchProvince();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getControlErrors(control: AbstractControl, errors: {}): string {
    return this.isSubmitted ? this.translocoService.translate(getControlErrors(control, errors)) : null;
  }

  public onSubmit(): void {
    this.appGoogleAnalyticsService.event({
      event: 'submit_lead_register_button_click',
      category: this.googleAnalyticsCategoryEnum.LEADS,
    });
    this.isSubmitted = true;

    if (this.registerForm.valid) {
      this.submitFormEvent.emit(this.registerForm.value);
    }
  }

  public closeForm(): void {
    this.appGoogleAnalyticsService.event({
      event: 'close_lead_register_button_click',
      category: this.googleAnalyticsCategoryEnum.LEADS,
    });
    this.closeFormEvent.emit();
  }

  private watchProvince(): void {
    if (this.registerForm.get('province')) {
      this.registerForm
        .get('province')
        .valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
        .subscribe((value) => {
          this.provinceChanged.emit(value);
          this.registerForm.get('city').setValue('');
        });
    }
  }
}
