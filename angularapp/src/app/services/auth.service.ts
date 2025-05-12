import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  // , private router: Router
  private apiUrl=environment.backendUri4;
  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.backendUri4}/user/signup`, user);
  }

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${environment.backendUri4}/user/login`, loginData);
  }

  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  updateProfile(userId: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/user/${userId}`, data, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.userSubject.next(null);
  }
}