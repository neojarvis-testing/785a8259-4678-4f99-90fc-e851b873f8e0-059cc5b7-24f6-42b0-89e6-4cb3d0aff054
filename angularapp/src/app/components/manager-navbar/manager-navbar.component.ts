import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.css']
})
export class ManagerNavbarComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userMobile: string = '';
  isLoading: boolean = true;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || 'Manager';
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      this.authService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.userEmail = profile.email ?? 'Not available';
          this.userMobile = profile.mobile ?? 'Not available';
          this.isLoading = false;
        },
        error: () => {
          this.userEmail = localStorage.getItem('userEmail') || 'Error loading';
          this.userMobile = localStorage.getItem('userMobile') || 'Error loading';
          this.isLoading = false;
        }
      });
    }
  }

  navigateToEdit() {
    const userId = localStorage.getItem('userId');
    this.router.navigate([`edit/${userId}`]);
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}