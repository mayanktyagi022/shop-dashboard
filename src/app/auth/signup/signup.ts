import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['../auth.styles.css'],
  imports: [ReactiveFormsModule, RouterLink]
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signup(): void {
    this.errorMessage = '';
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const success = this.auth.signup(this.signupForm.getRawValue());
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
    }
  }
}
