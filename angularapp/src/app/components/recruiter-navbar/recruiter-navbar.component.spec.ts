import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterNavbarComponent } from './recruiter-navbar.component';

describe('RecruiterNavbarComponent', () => {
  let component: RecruiterNavbarComponent;
  let fixture: ComponentFixture<RecruiterNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
