import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterViewCandidateComponent } from './recruiter-view-candidate.component';

describe('RecruiterViewCandidateComponent', () => {
  let component: RecruiterViewCandidateComponent;
  let fixture: ComponentFixture<RecruiterViewCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterViewCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterViewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
