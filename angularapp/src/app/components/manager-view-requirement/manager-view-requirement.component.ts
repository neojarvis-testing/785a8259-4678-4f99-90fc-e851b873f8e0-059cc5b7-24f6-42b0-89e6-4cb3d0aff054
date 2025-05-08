import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-manager-view-requirement',
  templateUrl: './manager-view-requirement.component.html',
  styleUrls: ['./manager-view-requirement.component.css']
})
export class ManagerViewRequirementComponent implements OnInit {
  requirements: any[] = [];
  filteredRequirements: any[] = [];
  searchTerm: string = '';
  selectedRequirementId: string | null = null;

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
}
