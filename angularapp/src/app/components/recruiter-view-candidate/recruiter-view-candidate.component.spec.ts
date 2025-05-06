import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecruiterViewCandidateComponent } from './recruiter-view-candidate.component';

describe('RecruiterViewCandidateComponent', () => {
  let component: RecruiterViewCandidateComponent;
  let fixture: ComponentFixture<RecruiterViewCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],

      declarations: [ RecruiterViewCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterViewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('Frontend_should_create_recruiter_view_candidate_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_projects_heading_in_the_recruiter_view_candidate_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Candidates');
  });
});
