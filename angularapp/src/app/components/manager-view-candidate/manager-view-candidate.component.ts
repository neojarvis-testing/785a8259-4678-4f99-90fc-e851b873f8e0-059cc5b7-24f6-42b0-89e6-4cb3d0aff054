import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/models/candidate.model';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-manager-view-candidate',
  templateUrl: './manager-view-candidate.component.html',
  styleUrls: ['./manager-view-candidate.component.css']
})
export class ManagerViewCandidateComponent implements OnInit {

  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 1;
  pages: number[] = [];
  isDeleteModal: boolean = false;
  selectedCandidateId: string | null = null;

  constructor(private readonly candidateService: CandidateService, private readonly router: Router) { }

  ngOnInit(): void {
    this.fetchCandidates();
  }

  fetchCandidates(): void {
    this.candidateService.getAllCandidates().subscribe((res) => {
      this.candidates = res;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const search = this.searchText.toLowerCase();
    this.filteredCandidates = this.candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(search) ||
      candidate.email.toLowerCase().includes(search) ||
      candidate.phone.includes(search)
    );
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCandidates.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.currentPage = 1;
  }

  get paginatedCandidates(): Candidate[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCandidates.slice(start, start + this.pageSize);
  }

  onEdit(id: string): void {
    this.router.navigate(['/recruiter/addCandidate', id]);
  }

  confirmDelete(id: string): void {
    this.selectedCandidateId = id;
    this.isDeleteModal = true;
  }

  deleteCandidate(): void {
    console.log("Trigger", this.selectedCandidateId);

    if (!this.selectedCandidateId) return;
    this.candidateService.deleteCandidate(this.selectedCandidateId).subscribe(() => {
      this.fetchCandidates();
      this.isDeleteModal = false
    });
    this.router.navigate(['/recruiter/getAllCandidates'])
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  cancelDelete(): void {
    this.selectedCandidateId = null;
    this.isDeleteModal = false;
  }

  toggleStatus(candidate: any): void {
    candidate.status = candidate.status === 'Approved' ? 'Rejected' : 'Approved';

    this.candidateService.updateCandidate(candidate._id, { status: candidate.status }).subscribe(
      () => {
        console.log(`Status updated to ${candidate.status}`);
      },
      (error) => {
        console.error('Error updating status', error);
      }
    );
  }

}