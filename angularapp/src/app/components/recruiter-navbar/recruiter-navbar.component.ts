import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-navbar',
  templateUrl: './recruiter-navbar.component.html',
  styleUrls: ['./recruiter-navbar.component.css']
})
export class RecruiterNavbarComponent implements OnInit {

  userId: string;

  constructor(private router : Router) { }

  ngOnInit(): void { 
    const user = localStorage.getItem('userName');
    this.userId = user;
    console.log('user object',user);
    
    console.log('userName', this.userId);
  }

  confirmLogout(): void {
    // Clear user session
    localStorage.clear();

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
