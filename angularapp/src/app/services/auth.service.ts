import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  // , private router: Router
  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.backendUri3}/user/signup`, user);
  }

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${environment.backendUri3}/user/login`, loginData);
  }

  // logout(): void {
  //   localStorage.clear();
  //   this.userSubject.next(null);
  //   this.router.navigate(['/login']);
  // }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

}