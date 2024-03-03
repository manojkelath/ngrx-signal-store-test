import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,LoginComponent,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showLoginModal: boolean = false;

  constructor() { }

  openLoginModal() {
    this.showLoginModal = true;
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  onLogin(credentials: { username: string, password: string }) {
    // Here you can handle the login logic
    console.log('Username:', credentials.username);
    console.log('Password:', credentials.password);
    // Close the modal after login
    this.showLoginModal = false;
    // Do we needa statementment like ngRx?
    // How can I leverage Signals?
  }

}
