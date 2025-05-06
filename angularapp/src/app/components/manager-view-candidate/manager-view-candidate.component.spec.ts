import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewCandidateComponent } from './manager-view-candidate.component';

describe('ManagerViewCandidateComponent', () => {
  let component: ManagerViewCandidateComponent;
  let fixture: ComponentFixture<ManagerViewCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
