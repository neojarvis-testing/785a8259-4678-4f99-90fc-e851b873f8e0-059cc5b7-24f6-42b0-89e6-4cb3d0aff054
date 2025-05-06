import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewRequirementComponent } from './manager-view-requirement.component';

describe('ManagerViewRequirementComponent', () => {
  let component: ManagerViewRequirementComponent;
  let fixture: ComponentFixture<ManagerViewRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerViewRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
