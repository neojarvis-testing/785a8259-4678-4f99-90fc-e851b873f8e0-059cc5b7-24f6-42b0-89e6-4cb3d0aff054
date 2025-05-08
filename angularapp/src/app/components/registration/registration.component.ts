import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements AfterViewInit {
  submitted = false;
  signupForm!: FormGroup;
  modalInstance!: any;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,15}$/)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngAfterViewInit(): void {
  }

  // Password match validation
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { mismatch: true };
  }


  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSignUp() {
    this.submitted = true;

    const userData: User = {
      userName: this.signupForm.value.userName,
      email: this.signupForm.value.email,
      mobile: this.signupForm.value.mobile,
      password: this.signupForm.value.password,
      role: this.signupForm.value.role,
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.submitted = false;
        localStorage.setItem('userEmail', this.signupForm.value.email);
        const modalElement = document.getElementById('successModal');
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      }

        // this.navigateToLogin();
        this.navigateToLogin();
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    });
  }
}