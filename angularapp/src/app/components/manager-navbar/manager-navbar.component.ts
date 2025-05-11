import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerNavbarComponent implements OnInit {

  userId: string;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('userName')
    this.userId = user
    console.log('user object',user);
    
    console.log('userName', this.userId);
  }

  logout(){
    
  }

  confirmLogout(): void {
    // Clear user session
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/login']);
  }

}