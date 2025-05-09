import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    // private toastr:ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.loginForm.patchValue({ email: localStorage.getItem('userEmail') ?? '' });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.loginError = '';
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('userName', response.userName);
          // if (response.role === 'Manager' || response.role === 'Recruiter') {
          //   this.toastr.success(`${response.username} logged in as ${response.role} successfully`, 'Success');
          // } else {
          //   this.toastr.success(`${response.username} logged in successfully`, 'Success');
          // }
  
          this.router.navigate(['/home']);
          localStorage.setItem('role',response.role);
          localStorage.removeItem('userEmail');
        },
        error: (err) => {
          console.log(err?.error.message);
          const msg = err?.error.message?.toLowerCase();
          console.log(msg.includes('invalid') || msg.includes('incorrect') || msg.includes('not found'));
          if (msg.includes('invalid') || msg.includes('incorrect') || msg.includes('not found')) {
            this.loginError = 'Invalid Email or Password';
            // this.toastr.error('Invalid Email or Password', 'Error');
          }
          localStorage.removeItem('userEmail');
        }
        
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}