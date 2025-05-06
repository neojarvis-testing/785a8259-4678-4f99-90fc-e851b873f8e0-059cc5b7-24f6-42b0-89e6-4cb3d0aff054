import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements AfterViewInit {

  signupForm!: FormGroup;
  modalInstance!: any;

  constructor(private fb: FormBuilder, private router: Router) {
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
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  // Password match validation
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  // Open modal with Bootstrap transition
  // openModal() {
  //   if (this.signupForm.valid && this.modalInstance) {
  //     this.modalInstance.show();
  //   }
  // }

  // Close modal properly
  // closeModal() {
  //   if (this.modalInstance) {
  //     this.modalInstance.hide();
  //   }
  // }

  // Navigate to login page
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}