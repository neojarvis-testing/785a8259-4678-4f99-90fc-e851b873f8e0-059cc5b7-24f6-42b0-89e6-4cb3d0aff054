import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.css'],
  encapsulation: ViewEncapsulation.None // ✅ Allows styles to affect the whole app
})
export class ManagerNavbarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  confirmLogout(): void {
    // Clear user session
    localStorage.removeItem('userToken');
    sessionStorage.clear();

    // Navigate to login page
    this.router.navigate(['/login']);
  }

}
