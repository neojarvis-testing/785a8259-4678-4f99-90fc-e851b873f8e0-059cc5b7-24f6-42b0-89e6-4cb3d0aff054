import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';

declare var $: any;

@Component({
  selector: 'app-recruiter-add-candidate',
  templateUrl: './recruiter-add-candidate.component.html',
  styleUrls: ['./recruiter-add-candidate.component.css']
})
export class RecruiterAddCandidateComponent implements OnInit {
  candidateForm: FormGroup;
  submitted = false;
  isEditMode = false;
  candidateId: string | null = null;
  successMessage: string ='';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      educationalQualification: ['', Validators.required],
      experience: ['', Validators.required],
      techStack: ['', Validators.required],
      resumeUrl: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
      applicationDate: [new Date(), Validators.required],
      status: ['Applied', Validators.required]
    });

    // check if we are in edit mode
    this.route.paramMap.subscribe(params => {
      this.candidateId = params.get('id');
      if (this.candidateId) {
        this.isEditMode = true;
        this.loadCandidate(this.candidateId);
      }
    });
  }

  get f() {
    return this.candidateForm.controls;
  }

  loadCandidate(id: string): void {
    this.candidateService.getCandidateById(id).subscribe(candidate => {
      if (candidate) {
        this.candidateForm.patchValue({
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone,
          educationalQualification: candidate.educationalQualification,
          experience: candidate.experience,
          techStack: candidate.techStack,
          resumeUrl: candidate.resumeUrl,
          applicationDate: candidate.applicationDate,
          status: candidate.status
        });
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
  
    if (this.candidateForm.invalid) return;
  
    const formData = this.candidateForm.value;
  
    if (this.isEditMode && this.candidateId) {
      this.candidateService.updateCandidate(this.candidateId, formData).subscribe(() => {
        this.successMessage = 'Candidate updated successfully!';
        $('#successModal').modal('show');
        
      });
    } else {
      this.candidateService.addCandidate(formData).subscribe(() => {
        this.successMessage = 'Candidate added successfully!';
        $('#successModal').modal('show');
        
      });
    }
  
  }

  redirectToList(): void {
    $('#successModal').modal('hide');
    this.router.navigate(['/recruiter/getAllCandidates']);
  }
  goBack(){
    this.router.navigate(['/recruiter/getAllCandidates'])
  }
}
