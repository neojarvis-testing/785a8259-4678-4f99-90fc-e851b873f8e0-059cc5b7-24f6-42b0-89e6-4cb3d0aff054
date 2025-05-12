import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthmGuard implements CanActivate {
  
  constructor(private readonly router: Router) {

  }
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if(token) {
      if(role === 'Recruiter') {
        return true;
      }
      else {
        this.router.navigate(['/home']);
        return false
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
