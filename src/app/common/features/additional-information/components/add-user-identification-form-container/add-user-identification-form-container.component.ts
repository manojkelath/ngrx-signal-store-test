import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, Observable, of, Subject, take, takeUntil } from 'rxjs';

import { USER_IDENTIFICATION_ADDRESS_CUSTOM_CONTROLS } from '@features/additional-information/constants';
import { getRequiredRegistrationItems } from '@features/additional-information/state/selectors';
import { COUNTRY_ID } from '@features/addresses/constants';
import { AddressCreateEditFromControlNameEnum } from '@features/addresses/enums';
import { AddressFormService } from '@features/addresses/services';
import { AddressReferencesActions } from '@features/addresses/state/actions';
import { postalCodePatternFormatValidator } from '@features/addresses/utils';
import { GoogleAnalyticsCategoryEnum } from '@features/app-google-analytics/enums';
import { ISelectOptionModel } from '@features/select';
import { KK_NUMBER_REGEX, KTP_NUMBER_REGEX } from '@shared/constants';
import { IAppState } from '@shared/models';
import { phoneValidator } from '@shared/utils';

@Component({
  selector: 'kv-add-user-identification-form-container',
  templateUrl: './add-user-identification-form-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AddressFormService],
})
export class AddUserIdentificationFormContainerComponent implements OnChanges, OnDestroy {
  @Input()
  public form: FormGroup;

  @Input()
  public isSubmitted: boolean;

  public provincesList$: Observable<ISelectOptionModel[]>;
  public citiesList$: Observable<ISelectOptionModel[]>;
  public districtsList$: Observable<ISelectOptionModel[]>;
  public subdistrictsList$: Observable<ISelectOptionModel[]>;
  public postalCodesList$: Observable<ISelectOptionModel[]>;
  public isPostalCodeInput$: Observable<boolean>;

  public googleAnalyticsCategoryEnum = GoogleAnalyticsCategoryEnum;

  private destroyed$ = new Subject<void>();
  private addressControls = USER_IDENTIFICATION_ADDRESS_CUSTOM_CONTROLS;
  private addressRequiredItems = ['subdistrict', 'district', 'locality', 'postalCode'];

  constructor(
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private store$: Store<IAppState>,
    private addressFormService: AddressFormService
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes?.['form'] && this.form) {
      this.initForm();
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initForm() {
    this.store$
      .pipe(select(getRequiredRegistrationItems), takeUntil(this.destroyed$), take(1))
      .subscribe((requiredItems) => {
        requiredItems.forEach((item) => {
          const name = item.name;

          if (item.valueRequired) {
            if (name === 'streetAddress') {
              this.store$.dispatch(AddressReferencesActions.loadProvinces());

              this.form.addControl('useCustomerAddress', this.formBuilder.control(true, [Validators.required]));
              this.form.addControl(AddressCreateEditFromControlNameEnum.PROVINCE, this.formBuilder.control(undefined));
              this.form.addControl(AddressCreateEditFromControlNameEnum.PROVINCE, this.formBuilder.control(''));
              this.form.addControl('streetAddress', this.formBuilder.control(''));
            } else {
              if (this.addressRequiredItems.includes(name)) {
                const { controlName, control } = this.getAddressControls(name);
                if (controlName) {
                  this.form.addControl(controlName, this.formBuilder.control(...control));
                }
              } else {
                this.form.addControl(name, this.formBuilder.control(...this.getControl(name)));
              }
            }
          }

          if (item.photoRequired) {
            this.form.addControl(this.getPhotoControl(name), this.formBuilder.control(undefined));
          }

          this.cd.markForCheck();
        });

        this.provincesList$ = this.addressFormService.getProvinceOptions$();
        this.citiesList$ = this.addressFormService.getCitiesOptions$(this.getForm$());
        this.districtsList$ = this.addressFormService.getDistrictsOptions$(this.getForm$());
        this.subdistrictsList$ = this.addressFormService.getSubdistrictsOptions$(this.getForm$());
        this.postalCodesList$ = this.addressFormService.getPostalCodeOptions$(this.getForm$());
        this.isPostalCodeInput$ = this.addressFormService.isPostalCodeInput$;

        this.watchCustomerAddress();
        this.addressFormService.createFormValueChangeListener(this.getForm$());
      });
  }

  private getAddressControls(key: string): {
    controlName: AddressCreateEditFromControlNameEnum | string;
    control: [string, (((control: AbstractControl) => ValidationErrors | null) | ValidatorFn)[]];
  } {
    switch (key) {
      case 'locality':
        return { controlName: AddressCreateEditFromControlNameEnum.CITY, control: ['', []] };
      case 'postalCode':
        return { controlName: AddressCreateEditFromControlNameEnum.POSTAL_CODE, control: ['', []] };
      case 'district':
        return { controlName: AddressCreateEditFromControlNameEnum.DISTRICT, control: ['', []] };
      case 'subdistrict':
        return { controlName: AddressCreateEditFromControlNameEnum.SUBDISTRICT, control: ['', []] };
      default:
        return null;
    }
  }

  private getControl(key: string): [string, (((control: AbstractControl) => ValidationErrors | null) | ValidatorFn)[]] {
    switch (key) {
      case 'KTP':
        return ['', [Validators.required, Validators.pattern(KTP_NUMBER_REGEX)]];
      case 'KK':
        return ['', [Validators.pattern(KK_NUMBER_REGEX)]];
      case 'birthDate':
        return ['', [Validators.required]];
      case 'placeOfBirth':
        return ['', [Validators.required]];
      case 'nationality':
        return ['', [Validators.required]];
      case 'maidenName':
        return ['', [Validators.required]];
      case 'country':
        return [COUNTRY_ID, []];
      case 'mobilePhone':
        return ['', [phoneValidator, Validators.required]];

      default:
        return [null, [Validators.required]];
    }
  }

  private getPhotoControl(name: string) {
    switch (name) {
      case 'KTP':
        return 'IDCARD';
      case 'KK':
        return 'IDCARD__KK';
      default:
        return 'SELFIE';
    }
  }

  private watchCustomerAddress(): void {
    if (this.form.get('useCustomerAddress')) {
      this.form
        .get('useCustomerAddress')
        .valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
        .subscribe((value) => {
          if (value) {
            this.addressControls.forEach((control) => {
              this.form.get(control)?.disable();
              this.form.get(control)?.setValidators([]);
            });
          } else {
            this.addressControls.forEach((control) => {
              this.form.get(control)?.enable();
              this.form
                .get(control)
                ?.setValidators(
                  control === AddressCreateEditFromControlNameEnum.POSTAL_CODE
                    ? [Validators.required, postalCodePatternFormatValidator]
                    : [Validators.required]
                );
            });
          }
        });
    }
  }

  private getForm$(): Observable<FormGroup<any>> {
    return of(this.form);
  }
}
