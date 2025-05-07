import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getAllCandidates(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendUrl}/candidate/getAllCandidates`);
  }
  getCandidateById(candidateId: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/candidate/getCandidateById/${candidateId}`);
  }
  addCandidate(candidate: Candidate): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/candidate/addCandidate`, candidate);
  }
  updateCandidate(candidateId: string, candidate: Candidate): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/candidate/updateCandidate/${candidateId}`,candidate);
  }
  deleteCandiate(candidateId: String): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/candidate/deleteCandiate/${candidateId}`);
  }
}
