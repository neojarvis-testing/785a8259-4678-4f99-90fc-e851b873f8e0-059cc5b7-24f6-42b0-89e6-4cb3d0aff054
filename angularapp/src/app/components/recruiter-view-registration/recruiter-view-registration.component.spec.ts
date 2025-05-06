import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterViewRegistrationComponent } from './recruiter-view-registration.component';

describe('RecruiterViewRegistrationComponent', () => {
  let component: RecruiterViewRegistrationComponent;
  let fixture: ComponentFixture<RecruiterViewRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterViewRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterViewRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
