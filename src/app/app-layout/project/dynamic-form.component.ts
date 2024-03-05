import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormConfigService } from './form-config.service';
import { customValidator } from './custom-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: true,
  imports : [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  formConfig: any[] = [];
  selectedLanguage: string = 'en'; // Assuming English as the default language

  constructor(private fb: FormBuilder, private formConfigService: FormConfigService) { }

  ngOnInit() {
    this.form = this.fb.group({});
    this.formConfigService.getFormConfig(this.selectedLanguage).subscribe(config => {
      this.formConfig = config;
      this.generateForm();
    });
  }

  generateForm() {
    for (const field of this.formConfig["en"]) {
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
      this.form.addControl(field.name, this.fb.control('', validators));
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Add any further actions you want to perform on form submission
    } else {
      // Handle invalid form submission if needed
    }
  }
}
