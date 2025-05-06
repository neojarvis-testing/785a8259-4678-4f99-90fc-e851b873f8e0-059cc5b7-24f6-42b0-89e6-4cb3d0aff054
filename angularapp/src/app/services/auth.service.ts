import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentRoleSubject=new BehaviorSubject<string | null>(null);
  private currentUserSubject=new BehaviorSubject<string | null>(null);

  constructor(private http:HttpClient, private router:Router) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/user/signup`, user);
  }


  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/user/login`, loginData).pipe(
      catchError(error => {
        let errorMsg = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = error.error?.message || 'Invalid credentials';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }


  logout():void{
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.currentRoleSubject.next(null);
    this.router.navigate(['/login']);
  }
  isAuthenticated():boolean{
    return !!localStorage.getItem('token');
  }
  

  getAllUsers():Observable<User[]>{
    const headers=new HttpHeaders({
      Authorization:`Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<User[]>(`${environment.backendUrl}/user/getAllusers`,{ headers });
  }
}
