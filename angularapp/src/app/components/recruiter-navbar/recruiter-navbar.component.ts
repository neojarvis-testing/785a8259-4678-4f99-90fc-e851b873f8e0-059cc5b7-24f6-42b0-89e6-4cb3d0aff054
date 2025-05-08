import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-navbar',
  templateUrl: './recruiter-navbar.component.html',
  styleUrls: ['./recruiter-navbar.component.css']
})
export class RecruiterNavbarComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  confirmLogout(): void {
    // Clear user session
    localStorage.removeItem('userToken');
    sessionStorage.clear();

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
