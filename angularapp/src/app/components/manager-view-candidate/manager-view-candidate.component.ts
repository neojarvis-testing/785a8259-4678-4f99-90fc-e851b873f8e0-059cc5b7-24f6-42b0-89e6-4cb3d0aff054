import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-manager-view-candidate',
  templateUrl: './manager-view-candidate.component.html',
  styleUrls: ['./manager-view-candidate.component.css']
})
export class ManagerViewCandidateComponent implements OnInit {
  candidates: any[] = [];
  filteredCandidates: any[] = [];
  searchTerm: string = '';

  constructor(private candidateService: CandidateService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCandidates();
  }

  /** Fetch all candidates */
  getAllCandidates(): void {
    this.candidateService.getAllCandidates().subscribe(
      (data) => {
        this.candidates = data;
        this.filteredCandidates = [...data]; // Initialize filtered list
      },
      (error) => {
        console.error('Error fetching candidates', error);
      }
    );
  }

  /** Filter candidates */
  filterCandidates(): void {
    if (this.searchTerm.trim().length > 0) {
      this.filteredCandidates = this.candidates.filter(candidate =>
        candidate.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        candidate.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        candidate.techStack?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCandidates = [...this.candidates];
    }
  }

  /** Toggle candidate status */
  toggleStatus(candidate: any): void {
    candidate.status = candidate.status === 'Active' ? 'Inactive' : 'Active';

    this.candidateService.updateCandidate(candidate._id, { status: candidate.status }).subscribe(
      () => {
        console.log(`Status updated to ${candidate.status}`);
      },
      (error) => {
        console.error('Error updating candidate status', error);
      }
    );
  }
}
