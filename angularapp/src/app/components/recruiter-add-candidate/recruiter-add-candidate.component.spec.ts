import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { RecruiterAddCandidateComponent } from './recruiter-add-candidate.component';

describe('RecruiterAddCandidateComponent', () => {
  let component: RecruiterAddCandidateComponent;
  let fixture: ComponentFixture<RecruiterAddCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],

      declarations: [ RecruiterAddCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterAddCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_recruiter_add_candidate_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_verify_the_existence_of_input_fields_by_placeholder_recruiter_add_candidate_component', () => {
    const nameInput = fixture.debugElement.query(By.css('input[placeholder="Name"]'));
    const emailInput = fixture.debugElement.query(By.css('input[placeholder="Email"]'));
    const phoneInput = fixture.debugElement.query(By.css('input[placeholder="Phone"]'));
    const educationalQualificationInput = fixture.debugElement.query(By.css('input[placeholder="Educational Qualification"]'));
    const experienceInput = fixture.debugElement.query(By.css('input[placeholder="Experience"]'));
    const techStackInput = fixture.debugElement.query(By.css('input[placeholder="Tech Stack"]'));
    const resumeUrlInput = fixture.debugElement.query(By.css('input[placeholder="Resume URL"]'));
  
    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneInput).toBeTruthy();
    expect(educationalQualificationInput).toBeTruthy();
    expect(experienceInput).toBeTruthy();
    expect(techStackInput).toBeTruthy();
    expect(resumeUrlInput).toBeTruthy();
  });
  

  

});
