import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-manager-add-requirement',
  templateUrl: './manager-add-requirement.component.html',
  styleUrls: ['./manager-add-requirement.component.css']
})
export class ManagerAddRequirementComponent implements OnInit {
  requirementForm: FormGroup;
  submitted = false;
  isEditMode = false;
  reqId: string | null = null;
  successMessage: string ='';

  ngOnInit(): void {
    this.requirementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required]
    });

    // check if we are in edit mode
    this.route.paramMap.subscribe(params => {
      this.reqId = params.get('id');
      if (this.reqId) {
        this.isEditMode = true;
        this.loadCandidate(this.reqId);
      }
    });
  }

  constructor(
    private readonly requirementService: RequirementService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  addRequirement(): void {
    if (this.requirementForm.valid) {
      if(this.isEditMode && this.reqId){
        this.requirementService.updateRequirement(this.reqId , this.requirementForm.value ).subscribe(() => {
          this.successMessage = 'Requirement updated successfully!';
          this.showSuccessModal();
        })
      }
      else{
        const newRequirement = this.requirementForm.value ;
        this.requirementService.addRequirement(newRequirement).subscribe(
          () => {
            this.submitted = true;
            this.successMessage = 'Requirement added successfully!';
            this.showSuccessModal();
          },
          (error) => {
            console.error('Error adding requirement', error);
          }
        );
      }
    }
  }

  loadCandidate(id: string): void {
    this.requirementService.getRequirementById(id).subscribe(req => {
      if (req) {
        this.requirementForm.patchValue({
          title: req.title,
          description: req.description,
          department: req.department
        })
      }
    })
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
  goBack(){
    this.router.navigate(['/manager/view-requirement'])
  }
  goHome(){
    this.router.navigate(['/home'])
  }
}
