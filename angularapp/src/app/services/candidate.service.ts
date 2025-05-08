import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidate } from '../models/candidate.model';


@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl: string = environment.backendUri2;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  /** Get all candidates */
  getAllCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/candidate/getAllCandidates`, { headers: this.getHeaders() });
  }

  /** Get candidate by ID */
  getCandidateById(candidateId: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.baseUrl}/candidate/getCandidateById/${candidateId}`, { headers: this.getHeaders() });
  }

  /** Add a new candidate */
  addCandidate(candidate: Candidate): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/candidate/addCandidate`, candidate, { headers: this.getHeaders() });
  }

  /** Update an existing candidate */
  updateCandidate(candidateId: string, candidate: Candidate): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/candidate/updateCandidate/${candidateId}`, candidate, { headers: this.getHeaders() });
  }

  /** Delete a candidate */
  deleteCandidate(candidateId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/candidate/deleteCandidate/${candidateId}`, { headers: this.getHeaders() });
  }
}

