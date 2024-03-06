import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormConfigService } from './form-config.service';
import { customValidator } from './custom-validator';
import { CommonModule } from '@angular/common';
import { DynamicStore } from './dynamic-form.store';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: true,
  imports : [
    FormsModule,
    ReactiveFormsModule,
    CommonModule 
  ],
  providers : [DynamicStore],
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  formConfig: any[] = [];
  selectedLanguage: string = 'en'; // Assuming English as the default language
  dyForm = inject(DynamicStore);

  constructor(private fb: FormBuilder, private formConfigService: FormConfigService) { }

  ngOnInit() {
    this.form = this.fb.group({});
    this.formConfigService.getFormConfig(this.selectedLanguage).subscribe(config => {
      this.formConfig = config;
      this.generateForm();
    });
  }

  generateForm() {
    for (const field of this.formConfig) {
      const validators = [];
      if (field.validators) {
        for (const validator of field.validators) {
          if (validator === 'required') {
            validators.push(Validators.required);
          } else if (validator.startsWith('custom')) {
            validators.push(customValidator(validator)); // Add custom validator
          }
        }
      }
      if(field.type === 'checkbox') {
        this.form.addControl(field.name, this.fb.control(true, validators));
      } else {
        this.form.addControl(field.name, this.fb.control('', validators));
      }
    }
  }

  onSubmit() {
    // sending loading
    this.dyForm.loading();


    if (this.form.valid) {
      this.dyForm.validateForm({});
      // lets call a mock API which take 3 seconds to load and responds back with success
      // use ngrx signal store
      // while the API is loading show a loader in the screen

      // Add any further actions you want to perform on form submission
    } else {
      // Handle invalid form submission if needed
    }
  }
}
