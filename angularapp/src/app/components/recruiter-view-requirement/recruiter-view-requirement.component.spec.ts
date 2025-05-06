import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterViewRequirementComponent } from './recruiter-view-requirement.component';

describe('RecruiterViewRequirementComponent', () => {
  let component: RecruiterViewRequirementComponent;
  let fixture: ComponentFixture<RecruiterViewRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterViewRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
