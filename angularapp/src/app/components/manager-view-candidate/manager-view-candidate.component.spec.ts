import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManagerViewCandidateComponent } from './manager-view-candidate.component';

describe('ManagerViewCandidateComponent', () => {
  let component: ManagerViewCandidateComponent;
  let fixture: ComponentFixture<ManagerViewCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],

      declarations: [ ManagerViewCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_manager_view_candidate_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_candidates_heading_in_the_manager_view_candidate_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Candidates');
  });
});
