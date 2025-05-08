import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter-add-candidate',
  templateUrl: './recruiter-add-candidate.component.html',
  styleUrls: ['./recruiter-add-candidate.component.css']
})
export class RecruiterAddCandidateComponent implements OnInit {

  candidate = {
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    techStack: '',
    resumeUrl: ''
  };

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form Submitted!', this.candidate);
    }
  }

  ngOnInit(): void {
  }

}
