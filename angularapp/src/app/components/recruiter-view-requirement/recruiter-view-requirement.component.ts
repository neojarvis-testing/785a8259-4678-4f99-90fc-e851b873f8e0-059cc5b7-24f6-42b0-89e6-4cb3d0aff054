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

  constructor(private requirementService: RequirementService) {}

  ngOnInit(): void {
    this.fetchRequirements();
  }

  fetchRequirements(): void {
    this.requirementService.getAllRequirements().subscribe((data) => {
      this.requirements = data;
      this.filteredRequirements = data;
    });
  }

  applySearch(): void {
    const search = this.searchText.toLowerCase();
    this.filteredRequirements = this.requirements.filter(req =>
      req.title.toLowerCase().includes(search) ||
      req.description.toLowerCase().includes(search) ||
      req.department.toLowerCase().includes(search)
    );
  }
}

