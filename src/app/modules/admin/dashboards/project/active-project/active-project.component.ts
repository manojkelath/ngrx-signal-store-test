import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DynamicStore } from '../dynamic-form/dynamic-form.store';

@Component({
  selector: 'app-active-project',
  templateUrl: './active-project.component.html',
  standalone: true,
  imports : [
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule
  ],
  providers : [DynamicStore],
  styleUrls: ['./active-project.component.scss']
})
export class ActiveProjectComponent implements OnInit {
  
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
            about   : [''],
            email   : ['hughes.brian@mail.com', Validators.email],
            subtype : [''],
            tags    : [''],
            location: [''],
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
