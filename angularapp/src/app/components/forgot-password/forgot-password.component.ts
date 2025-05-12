import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  isSubmitted: boolean = false;
  message: string = '';
  error: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly passwordResetService: PasswordResetService
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.forgotForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.message = '';
    this.error = '';

    if (this.forgotForm.invalid) return;

    const email = this.forgotForm.value.email;

    this.passwordResetService.forgotPassword(email).subscribe({
      next: (res) => {
        this.message = res.message;
        this.forgotForm.reset();
        this.isSubmitted = false;
      },
      error: (err) => {
        this.error = err.error?.message ?? 'Something went wrong. Please try again.';
        this.isSubmitted = false;
      }
    });
  }
}
