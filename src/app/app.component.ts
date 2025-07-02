import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CustomValidators } from './validators/custom-validators';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private fb: FormBuilder,private authService: AuthService) {
  }

  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isUser(): boolean {
    return this.authService.getUserRole() === 'user';
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  logout(): void {
    this.authService.logout();
  }
 
}