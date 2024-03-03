import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogInStore } from './login.store';

export interface UserInfo {
  username : string,
  password: string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() login: EventEmitter<{ username: string, password: string }> = new EventEmitter();

  store = inject(LogInStore);

  constructor() { }

  signIn() {
    // this.login.emit({ username: this.username, password: this.password });
    // You can add your login logic here
    this.store.logIntoServer({ username: this.username, password: this.password });
  }

  closeModal() {
    this.close.emit();
  }
}