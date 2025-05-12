import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.loginForm.patchValue({ email: localStorage.getItem('userEmail') ?? '' });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          localStorage.setItem('userName', response.userName);
          localStorage.setItem('role', response.role);

          // Fetch complete profile
          this.authService.getUserProfile(response.id).subscribe(profile => {
            localStorage.setItem('userEmail', profile.email);
            localStorage.setItem('userMobile', profile.mobile);
            
            // Redirect based on role
            this.router.navigate(['/home']);
          });
        },
        error: (err) => {
          console.log(err?.error.message);
          const msg = err?.error.message?.toLowerCase();
          if (msg.includes('invalid') ?? msg.includes('incorrect') ?? msg.includes('not found')) {
            this.loginError = 'Invalid Email or Password';
          }
          localStorage.removeItem('userEmail');
        }
      });
    }
  }
}