import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from 'src/app/services/password-reset.service';
import {jwtDecode} from 'jwt-decode';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string = '';
  message: string = '';
  error: string = '';
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private passwordResetService: PasswordResetService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchPasswords });
  }    

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    if (this.token) {
      try {
        const decodedToken: any = jwtDecode(this.token);
        const userEmail = decodedToken.email;
  
        if (userEmail) {
          this.resetForm.patchValue({ email: userEmail });
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  
  }

  get f() {
    return this.resetForm.controls;
  }

  matchPasswords(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.message = '';
    this.error = '';

    if (this.resetForm.invalid) return;

    const { password } = this.resetForm.value;

    this.passwordResetService.resetPassword(this.token, password).subscribe({
      next: (res) => {
        this.message = res.message || 'Password reset successfully!';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Password reset failed. Please try again.';
        this.isSubmitted = false;
      }
    });
  }
}