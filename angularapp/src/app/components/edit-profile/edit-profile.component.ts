import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  loading = false;
  userId: string;
  userRole: string ='';
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'] ?? localStorage.getItem('userId');
    this.loadUserData();
    this.userRole=localStorage.getItem("role")
  }
  get f() { return this.editForm.controls; }

  loadUserData(): void {
    this.authService.getUserProfile(this.userId).subscribe({
      next: (user) => {
        this.editForm.patchValue({
          name: user.userName ?? '',
          email: user.email ?? '',
          mobile: user.mobile ?? ''
        });
      },
      error: (err) => {
        console.error('Failed to load user data', err);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    if (this.editForm.invalid) {
      this.loading = false;
      return;
    }

    this.authService.updateProfile(this.userId, this.editForm.value).subscribe({
      next: () => {
        if (this.editForm.value.name) {
          localStorage.setItem('userName', this.editForm.value.name);
        }
        if (this.editForm.value.email) {
          localStorage.setItem('userEmail', this.editForm.value.email);
        }
        if (this.editForm.value.mobile) {
          localStorage.setItem('userMobile', this.editForm.value.mobile);
        }
        
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Update failed', err);
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }
}