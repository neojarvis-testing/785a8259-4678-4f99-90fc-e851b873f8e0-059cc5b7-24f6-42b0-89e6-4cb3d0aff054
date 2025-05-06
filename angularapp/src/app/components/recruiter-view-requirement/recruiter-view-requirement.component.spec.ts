import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecruiterViewRequirementComponent } from './recruiter-view-requirement.component';

describe('RecruiterViewRequirementComponent', () => {
  let component: RecruiterViewRequirementComponent;
  let fixture: ComponentFixture<RecruiterViewRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],

      declarations: [ RecruiterViewRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_recruiter_view_requirement_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_requirements_heading_in_the_recruiter_view_requirement_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Requirements');
  });
});
