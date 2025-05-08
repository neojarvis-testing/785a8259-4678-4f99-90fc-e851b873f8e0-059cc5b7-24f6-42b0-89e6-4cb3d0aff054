import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-manager-add-requirement',
  templateUrl: './manager-add-requirement.component.html',
  styleUrls: ['./manager-add-requirement.component.css']
})
export class ManagerAddRequirementComponent implements OnInit {
  requirementForm: FormGroup;
  submitted = false;

  constructor(
    private requirementService: RequirementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.requirementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  addRequirement(): void {
    if (this.requirementForm.valid) {
      const newRequirement = this.requirementForm.value;
      this.requirementService.addRequirement(newRequirement).subscribe(
        () => {
          this.submitted = true;
          this.showSuccessModal();
        }, 
        (error) => {
          console.error('Error adding requirement', error);
        }
      );
    }
  }

  showSuccessModal(): void {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      (modalElement as any).classList.add('show');
      (modalElement as any).style.display = 'block';
    }
  }

  closeModalAndNavigate(): void {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      (modalElement as any).classList.remove('show');
      (modalElement as any).style.display = 'none';
    }
    this.router.navigate(['/manager/view-requirement']);
  }
}
