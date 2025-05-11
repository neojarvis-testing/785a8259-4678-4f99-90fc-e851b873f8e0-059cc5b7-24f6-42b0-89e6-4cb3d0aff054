import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  token: string = '';
  message: string = '';
  error: string = '';
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private passwordResetService: PasswordResetService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchPasswords });
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
        this.message = res.message;
        setTimeout(() => this.router.navigate(['/login']), 2000); // Redirect after success
      },
      error: (err) => {
        this.error = err.error?.message || 'Reset failed. Please try again.';
        this.isSubmitted = false;
      }
    });
  }
}
