import { Component, EventEmitter, Output, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { fuseAnimations } from '../../../@fuse/animations/public-api';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Subscription, finalize } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { LogInStore } from './login.store';

export interface UserInfo {
  username : string,
  password: string,
}
@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations     : fuseAnimations
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginError: string = '';
  subscription!: Subscription;
  loading: boolean = false;
  username: string = '';
  password: string = '';

  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() login: EventEmitter<{ username: string, password: string }> = new EventEmitter();

  store = inject(LogInStore);

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,3})$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  signIn(): void {
    // this.login.emit({ username: this.username, password: this.password });
    // You can add your login logic here
    this.store.logIntoServer({ username: this.username, password: this.password });
  }

  
  navigateDashboard(role: string): void {
    const dashboardRoute =
      role === 'admin' ? '/admindashboard' : '/userdashboard';
    this.router.navigate([dashboardRoute]);
    console.log(`${role} dashboard route`);
  }

  ngOnDestroy(): void {
    if (!this.subscription) {
      return;
    }else{
      return this.subscription.unsubscribe();
    }
  }

  closeModal() {
        this.close.emit();
      }
}
//   username: string = '';
//   password: string = '';
//   signInForm!: UntypedFormGroup;

//   @Output() close: EventEmitter<void> = new EventEmitter();
//   @Output() login: EventEmitter<{ username: string, password: string }> = new EventEmitter();

//   store = inject(LogInStore);

//   constructor(private _formBuilder: UntypedFormBuilder) { }

//   ngOnInit(): void
//   {
//       // Create the form
//       this.signInForm = this._formBuilder.group({
//         email : new FormControl('', [Validators.required, Validators.email]),
//         password : new FormControl (['', Validators.required]),
//           rememberMe: [''],
//       });
//   }

//   signIn() {
//     // this.login.emit({ username: this.username, password: this.password });
//     // You can add your login logic here
//     this.store.logIntoServer({ username: this.username, password: this.password });
//   }

//   closeModal() {
//     this.close.emit();
//   }
// }