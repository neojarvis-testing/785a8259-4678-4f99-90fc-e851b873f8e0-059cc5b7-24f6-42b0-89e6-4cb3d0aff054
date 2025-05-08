import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private baseUrl: string = environment.backendUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /** Get all requirements */
  getAllRequirements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllRequirements`, { headers: this.getHeaders() });
  }

  /** Get requirement by ID */
  getRequirementById(requirementId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getRequirementById/${requirementId}`, { headers: this.getHeaders() });
  }

  /** Add a new requirement */
  addRequirement(requirement: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addRequirement`, requirement, { headers: this.getHeaders() });
  }

  /** Update an existing requirement */
  updateRequirement(requirementId: string, requirement: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateRequirement/${requirementId}`, requirement, { headers: this.getHeaders() });
  }

  /** Delete a requirement */
  deleteRequirement(requirementId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteRequirement/${requirementId}`, { headers: this.getHeaders() });
  }
}
