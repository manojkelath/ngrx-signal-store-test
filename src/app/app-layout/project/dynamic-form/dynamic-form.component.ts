import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormConfigService } from './form-config.service';
import { customValidator } from './custom-validator';
import { DynamicStore } from './dynamic-form.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: true,
  imports : [
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule
  ],
  providers : [DynamicStore],
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  
    accountForm!: UntypedFormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.accountForm = this._formBuilder.group({
            name    : ['Brian Hughes'],
            username: ['brianh'],
            title   : ['Senior Frontend Developer'],
            company : ['YXZ Software'],
            about   : ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
            email   : ['hughes.brian@mail.com', Validators.email],
            phone   : ['121-490-33-12'],
            country : ['usa'],
            language: ['english'],
        });
    }
  // description: string = '';
  // form!: FormGroup;
  // formConfig: any[] = [];
  // selectedLanguage: string = 'en'; // Assuming English as the default language
  // dyForm = inject(DynamicStore);

  // constructor(private fb: FormBuilder, private formConfigService: FormConfigService) { }

  // ngOnInit() {
  //   this.form = this.fb.group({});
  //   this.formConfigService.getFormConfig(this.selectedLanguage).subscribe(config => {
  //     this.formConfig = config;
  //     this.generateForm();
  //   });
  // }

  // generateForm() {
  //   for (const field of this.formConfig) {
  //     const validators = [];
  //     if (field.validators) {
  //       for (const validator of field.validators) {
  //         if (validator === 'required') {
  //           validators.push(Validators.required);
  //         } else if (validator.startsWith('custom')) {
  //           validators.push(customValidator(validator)); // Add custom validator
  //         }
  //       }
  //     }
  //     if(field.type === 'checkbox') {
  //       this.form.addControl(field.name, this.fb.control(true, validators));
  //     } else {
  //       this.form.addControl(field.name, this.fb.control('', validators));
  //     }
  //   }
  // }

  // onSubmit() {
    // sending loading
    // this.dyForm.loading();


    // if (this.form.valid) {
    //   this.dyForm.validateForm({});
      // lets call a mock API which take 3 seconds to load and responds back with success
      // use ngrx signal store
      // while the API is loading show a loader in the screen

      // Add any further actions you want to perform on form submission
    // } else {
      // Handle invalid form submission if needed
//     }
//   }
}
