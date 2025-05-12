import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Requirement } from 'src/app/models/requirement.model';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-manager-view-requirement',
  templateUrl: './manager-view-requirement.component.html',
  styleUrls: ['./manager-view-requirement.component.css']
})
export class ManagerViewRequirementComponent implements OnInit {
  requirements: Requirement[] = []; 
  filteredRequirements: Requirement[] = [];
  searchTerm: string = '';
  selectedRequirementId: string | null = null;
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 1;
  pages: number[] = []; 

  constructor(private requirementService: RequirementService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRequirements();
  }

  /** Fetch all requirements */
  getAllRequirements(): void {
    this.requirementService.getAllRequirements().subscribe(
      (data) => {
        this.requirements = data;
        this.filteredRequirements = [...data]
        // console.log(this.filteredRequirements);
        this.calculatePagination(); 
      },
      (error) => {
        console.error('Error fetching requirements', error);
      }
    );
  }

  //filtering the requirements
  filterRequirements(): void {
    if (this.searchTerm.trim().length > 0) { 
      this.filteredRequirements = this.requirements.filter(req =>
        req.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        req.department.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredRequirements = [...this.requirements];
    }
    this.calculatePagination();
  }
  
  
 /** Set selected requirement ID when clicking "Delete" */
 setSelectedRequirement(requirementId: string): void {
  this.selectedRequirementId = requirementId;
}

/** Delete requirement only after confirmation */
deleteRequirement(): void {
  if (this.selectedRequirementId) {
    this.requirementService.deleteRequirement(this.selectedRequirementId).subscribe(
      () => {
        this.getAllRequirements(); // Refresh list after deletion
        this.selectedRequirementId = null; // Reset selected ID
      },
      (error) => {
        console.error('Error deleting requirement', error);
      }
    );
  }
}

toggleStatus(requirement: any): void {
  requirement.status = requirement.status === 'Active' ? 'Closed' : 'Active';

  this.requirementService.updateRequirement(requirement._id, { status: requirement.status }).subscribe(
    () => {
      console.log(`Status updated to ${requirement.status}`);
    },
    (error) => {
      console.error('Error updating status', error);
    }
  );
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
