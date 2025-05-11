import { Component, OnInit } from '@angular/core';
import { Requirement } from 'src/app/models/requirement.model';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-recruiter-view-requirement',
  templateUrl: './recruiter-view-requirement.component.html',
  styleUrls: ['./recruiter-view-requirement.component.css']
})
export class RecruiterViewRequirementComponent implements OnInit {

  requirements: Requirement[] = [];
  filteredRequirements: Requirement[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private requirementService: RequirementService) {}

  ngOnInit(): void {
    this.fetchRequirements();
  }

  fetchRequirements(): void {
    this.requirementService.getAllRequirements().subscribe((data) => {
      this.requirements = data;
      this.filteredRequirements = data;
      this.applySearch();
      this.calculatePagination(); 
    });
  }

  applySearch(): void {
    const search = this.searchText.toLowerCase();
    this.filteredRequirements = this.requirements.filter(req =>
      req.title.toLowerCase().includes(search) ||
      req.description.toLowerCase().includes(search) ||
      req.department.toLowerCase().includes(search)
    );
    this.calculatePagination(); 
  }
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRequirements.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.currentPage = 1;
  }

  get paginatedRequirements(): Requirement[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRequirements.slice(start, start + this.pageSize);
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
}

