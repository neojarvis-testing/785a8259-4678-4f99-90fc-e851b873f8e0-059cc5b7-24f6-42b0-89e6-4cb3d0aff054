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

  constructor(private requirementService: RequirementService, private router: Router) {}

  ngOnInit(): void {
    this.getAllRequirements();
  }

  /** Fetch all requirements */
  getAllRequirements(): void {
    this.requirementService.getAllRequirements().subscribe(
      (data) => {
        this.requirements = data;
      },
      (error) => {
        console.error('Error fetching requirements', error);
      }
    );
  }

  //filtering the requirements
  filterRequirements(): void {
    this.filteredRequirements = this.requirements.filter(req =>
      req.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      req.department.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /** Navigate to edit requirement */
  editRequirement(requirement: any): void {
    this.router.navigate(['/add-requirement'], { state: { requirementData: requirement } });
  }

  /** Delete requirement */
  deleteRequirement(requirementId: string): void {
    if (confirm('Are you sure you want to delete this requirement?')) {
      this.requirementService.deleteRequirement(requirementId).subscribe(
        () => {
          this.getAllRequirements();
        },
        (error) => {
          console.error('Error deleting requirement', error);
        }
      );
    }
  }
}
