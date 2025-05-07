import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/user/signup`, user);
  }

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/user/login`, loginData);
  }

  logout(): void {
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

}