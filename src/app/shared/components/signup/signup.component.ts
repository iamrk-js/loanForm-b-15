import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required] // Default role is 'user'
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.auth.register(this.signupForm.value).subscribe({
        next: (res) => {
          this.auth.setSession(res.token, res.role);
          this.snackbar.showSuccess('Signup successful!');
          this.router.navigate([this.auth.isAdmin() ? '/admin/dashboard' : '/dashboard']);
        },
        error: () => this.snackbar.showError('Signup failed. Please try again.')
      });
    } else {
      this.snackbar.showError('Please fill all required fields correctly.');
    }
  }
}